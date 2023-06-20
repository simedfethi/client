import {IActivite} from "./activite.model";

export interface exNotification extends IActivite {
  scheduling?: boolean | null;
  heureActiviteISO?: string | null;
}
