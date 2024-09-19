import { EventEmitter, Subscription } from 'expo-modules-core';
import ReactNativeOverlayWindowModule from './ReactNativeOverlayWindowModule';
import { ICreateOverlay, IListener } from './ReactNativeOverlayWindow.types';


const emitter = new EventEmitter(ReactNativeOverlayWindowModule);

export function addOverlayVisibilityListener(
  listener: (event: IListener) => void
): Subscription {
  return emitter.addListener("onOverlayVisibilityChange", listener);
}

export async function createOverlayAsync(options: ICreateOverlay): Promise<string> {
  return await ReactNativeOverlayWindowModule.createOverlay(options);
}


export async function removeOverlayAsync(): Promise<string> {
  return await ReactNativeOverlayWindowModule.removeOverlay();
}