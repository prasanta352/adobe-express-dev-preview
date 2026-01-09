//#region

import { DisableDragToDocument } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

/**
 * Authorization status.
 */
export enum AuthorizationStatus {
  SUCCESS = "SUCCESS",
  POPUP_OPENED = "POPUP_OPENED",
  POPUP_BLOCKED = "POPUP_BLOCKED",
  POPUP_CLOSED = "POPUP_CLOSED",
  POPUP_TIMEOUT = "POPUP_TIMEOUT",
  FAILED = "FAILED",
}
/**
 * Rendition page range
 */
export enum Range {
  /**
   * Generate rendition for the current page
   */
  currentPage = "currentPage",
  /**
   * Generate rendition for all the pages
   */
  entireDocument = "entireDocument",
}
/**
 * Required ouput Format of the rendition
 */
export enum RenditionFormat {
  /**
   * PNG format
   */
  png = "image/png",
  /**
   * JPG format
   */
  jpg = "image/jpeg",
  /**
   * MP4 format
   */
  mp4 = "video/mp4",
  /**
   * PDF format
   */
  pdf = "application/pdf",
}
/**
 * Rendition Type
 */
export enum RenditionType {
  /**
   * Rendition of the whole page
   */
  page = "page",
}
/**
 * Types of dialog variants supported.
 */
export enum Variant {
  /**
   * Ask a user to confirm an action
   */
  confirmation = "confirmation",
  /**
   * Share information for user to acknowledge
   */
  information = "information",
  /**
   * Share information that a user needs to consider before proceeding
   */
  warning = "warning",
  /**
   * Tell a user that if they proceed with an action, it may impact their data in a negative way
   */
  destructive = "destructive",
  /**
   * Communicate critical issue that a user needs to resolve before proceeding
   */
  error = "error",
  /**
   * Ask a user to provide some inputs
   */
  input = "input",
  /**
   *  A dialog that can render complex forms and content
   */
  custom = "custom",
}
/**
 * The type of the input field in Simple Dialog.
 */
export enum FieldType {
  /**
   * One-line text input field
   */
  text = "text",
}
/**
 * The type of the dialog result
 */
export enum DialogResultType {
  /**
   * Alert dialog result
   */
  alert = "alert",
  /**
   * Input dialog result
   */
  input = "input",
  /**
   * Custom dialog result
   */
  custom = "custom",
}
/**
 * Button types for Simple Dialog
 */
export enum ButtonType {
  /**
   * Primary button pressed
   */
  primary = "primary",
  /**
   * Secondary button pressed
   */
  secondary = "secondary",
  /**
   * Cancel button pressed
   */
  cancel = "cancel",
  /**
   * Dialog closed via ESC or close(X) button
   */
  close = "close",
}
export enum RuntimeType {
  /**
   * Iframe based runtime that usually hosts the add-on main UI logic.
   */
  panel = "panel",
  /**
   * Iframe based runtime that hosts a modal dialog UI
   */
  dialog = "dialog",
  /**
   * Add-On's script runtime - js runtime that hosts the add-ons script / document authoring logic.
   */
  script = "script",
}
/**
 * Rendition Intent
 */
export enum RenditionIntent {
  /**
   * Intent to export/download the content
   */
  export = "export",
  /**
   * Intent to preview the content
   */
  preview = "preview",
}
//#endregion
// @ts-ignore Import module
export const mockAddOnSdk: AddOnSDKAPI = {
  app: {
    ui: {
      locale: "",
      locales: [],
      theme: "",
    },
    oauth: {
      async authorize(request) {
        return {
          code: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.wtx1vmMlf5y-anyrv9nVuGbK60rblk80ObmCtRTVl_k",
          id: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.wtx1vmMlf5y-anyrv9nVuGbK60rblk80ObmCtRTVl_k",
          redirectUri: "",
          result: { description: "", status: AuthorizationStatus.SUCCESS },
        };
      },
      async authorizeWithOwnRedirect(request) {
        return {
          description: "",
          status: AuthorizationStatus.FAILED,
        };
      },
    },
    document: {
      async addImage(imageBlob) {
        console.log(imageBlob);
        const url = URL.createObjectURL(imageBlob);
        window.open(url, "_blank");
        return;
      },
      async addVideo(videoBlob) {},
      async createRenditions(renditionOptions) {
        if (
          renditionOptions.format === mockAddOnSdk.constants.RenditionFormat.mp4
        ) {
          if ("throw_error" in window) throw new Error("Failed to get assets");
          //await wait(6e3);
          const blob = await getVideoBlobFromUrl(
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
          );
          return [{ blob, type: RenditionType.page }];
        }
        const blob = await getBlobFromImageUrl(
          "https://images.pexels.com/photos/1428169/pexels-photo-1428169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        );
        const blob2 = await getBlobFromImageUrl(
          "https://images.pexels.com/photos/1428169/pexels-photo-1428169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        );
        return [
          { blob, type: RenditionType.page },
          { blob: blob2, type: RenditionType.page },
        ];
      },
      async addAnimatedImage(imageBlob) {
        const url = URL.createObjectURL(imageBlob);

        window.open(url, "_blank");
        return;
      },
      async getPagesMetadata(options) {
        console.log("options", options);
        var hasTemporalContent = false;
        return [
          {
            id: "772dc4b6-0df5-469f-b477-2a0c5445a6ef",
            title: "My First Page",
            size: { width: 2550, height: 3300 },
            hasPremiumContent: false,
            hasTemporalContent,
            pixelsPerInch: 72,
            isPrintReady: true,
            isBlank: false,
            templateDetails: {
              id: "urn:aaid:sc:VA6C2:0ccab100-a230-5b45-89f6-7e78fdf04141",
              creativeIntent: "flyer",
            },
          },
        ];
      },
    },
    currentUser: {
      async userId() {
        return "";
      },
    },
    devFlags: { simulateFreeUser: false },
    enableDragToDocument(element, dragCallbacks): DisableDragToDocument {
      return () => {};
    },
    on(name, handler) {},
    off(name, handler) {},
    async showModalDialog(opt) {
      return {
        type: DialogResultType.custom,
        result: undefined,
      } as any;
    },
  },
  apiVersion: "1.0",
  instance: {
    clientStorage: {
      async clear() {
        localStorage.clear();
      },
      async getItem(key: string) {
        return localStorage.getItem(key);
      },
      async removeItem(key: string) {
        localStorage.removeItem(key);
      },
      async setItem(key: string, value: string) {
        localStorage.setItem(key, value);
      },
      async keys() {
        return Object.keys(localStorage);
      },
    },
    manifest: {},
    runtime: { type: RuntimeType.panel },
  },
  ready: new Promise<void>((res) => res),
  constants: {
    AuthorizationStatus: AuthorizationStatus,
    ButtonType,
    DialogResultType,
    FieldType,
    Range,
    RenditionFormat,
    RenditionType,
    RuntimeType,
    Variant,
    RenditionIntent,
  },
};
const wait = (t: number) => new Promise((res) => setTimeout(res, t));
const getVideoBlobFromUrl = async (src: string) => {
  return fetch(src).then((e) => e.blob());
};

const getBlobFromImageUrl = (src: string) =>
  new Promise<Blob>((res, rej) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    img.crossOrigin = "anonymous";
    img.onload = () => {
      canvas.height = img.height;
      canvas.width = img.width;
      ctx?.drawImage(img, 0, 0, img.width, img.height);
      canvas.toBlob((blob) => {
        if (blob) res(blob);
        else rej("Failed to get the blob");
      });
    };
    img.onerror = () => rej("Some error ocurred");
    img.src = src;
    setTimeout(() => rej("Timeout"), 10e3);
  });
