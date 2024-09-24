package expo.modules.overlaywindow

import android.app.Activity
import android.Manifest
import android.content.Context
import android.graphics.PixelFormat
import android.os.Build
import android.util.Log
import android.view.Gravity
import android.view.LayoutInflater
import android.view.View
import android.view.WindowManager
import android.widget.TextView
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import androidx.core.os.bundleOf
import android.widget.ImageView
import expo.modules.interfaces.permissions.Permissions
import expo.modules.interfaces.permissions.Permissions.askForPermissionsWithPermissionsManager
import expo.modules.interfaces.permissions.Permissions.getPermissionsWithPermissionsManager
import expo.modules.kotlin.exception.Exceptions
import expo.modules.kotlin.Promise
import android.provider.Settings

class ReactNativeOverlayWindowModule : Module() {

    private lateinit var windowManager: WindowManager
    private lateinit var overlayView: View
    private val permissionsManager: Permissions
        get() = appContext.permissions ?: throw Exceptions.PermissionsModuleNotFound()

    override fun definition() = ModuleDefinition {
        Name("ReactNativeOverlayWindow")

        Events("onOverlayVisibilityChange")

        Function("checkPermission") {
            val context: Context = appContext.reactContext ?: return@Function false
            Settings.canDrawOverlays(context)
        }

        // AsyncFunction("createOverlay") { options: Map<String, Any> ->
        //     val activity = appContext.activityProvider?.currentActivity
        //     val title = options["title"] as? String ?: "Default Title"
        //     val body = options["body"] as? String ?: "Default Body"

        //     if (activity != null) {
        //         setupOverlay(activity.applicationContext, title, body, options)
        //         sendOverlayVisibilityEvent(true)
        //         "Overlay created"
        //     } else {
        //         "Activity is null"
        //     }
        // }

        AsyncFunction("createOverlay") { options: Map<String, Any> ->
            val context = appContext.reactContext ?: throw Exceptions.ReactContextLost()
            val title = options["title"] as? String ?: "Default Title"
            val body = options["body"] as? String ?: "Default Body"

            setupOverlay(context, title, body, options)
            sendOverlayVisibilityEvent(true)
            "Overlay created"
        }

        Function("removeOverlay") {
            removeOverlay()
            sendOverlayVisibilityEvent(false)
            "Overlay removed"
        }
    }

    private fun setupOverlay(
        context: Context,
        title: String,
        body: String,
        options: Map<String, Any>
    ) {
        windowManager = context.getSystemService(Context.WINDOW_SERVICE) as WindowManager
        val inflater = LayoutInflater.from(context)
        overlayView = inflater.inflate(R.layout.overlay_layout, null)

        val titleTextView: TextView = overlayView.findViewById(R.id.title_text)
        val bodyTextView: TextView = overlayView.findViewById(R.id.body_text)

        titleTextView.text = title
        bodyTextView.text = body

        if (body.isEmpty()) {
            bodyTextView.visibility = View.GONE
        } else {
            bodyTextView.visibility = View.VISIBLE
        }
        if (title.isEmpty()) {
            titleTextView.visibility = View.GONE
        } else {
            titleTextView.visibility = View.VISIBLE
        }

        val layoutParams = WindowManager.LayoutParams(
            WindowManager.LayoutParams.WRAP_CONTENT,
            WindowManager.LayoutParams.WRAP_CONTENT,
            if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
                WindowManager.LayoutParams.TYPE_PHONE
            } else {
                WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY
            },
            WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE,
            PixelFormat.TRANSLUCENT
        )

        layoutParams.gravity = Gravity.TOP or Gravity.START
        layoutParams.x = 20
        layoutParams.y = 20

        val closeButton: ImageView = overlayView.findViewById(R.id.close_button)
        closeButton.setOnClickListener {
            removeOverlay()
            sendOverlayVisibilityEvent(false)
        }

        windowManager.addView(overlayView, layoutParams)
    }

    private fun removeOverlay() {
        if (::windowManager.isInitialized && ::overlayView.isInitialized) {
            windowManager.removeView(overlayView)
        }
    }

    private fun sendOverlayVisibilityEvent(isVisible: Boolean) {
        this@ReactNativeOverlayWindowModule.sendEvent(
            "onOverlayVisibilityChange",
            bundleOf("visible" to isVisible)
        )
    }
}
