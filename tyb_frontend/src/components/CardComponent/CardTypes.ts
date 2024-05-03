/**
 * Interface
 *  @description card interface
 */
export interface CardComponentConfig {
    status?: CardStatusEnum;
    image?: any;
    id: string;
    title: string;
    description: string;
    button1?: {
        label?:string,
        onClick:Function
    };
}

/**
 * Interface
 *  @description button interface for cards
 */
export interface CardButtonType {
    label: string,
    type: string,
    clickFunction: Function,
    disabled? : boolean
}

/**
 * Enum
 *  @description Enum object, set of button classes
 */
export enum ButtonTypeEnum {
    DANGER = "btn btn-danger",
    DANGER_OUTLINE = "btn btn-outline-danger",
    PRIMARY = "btn btn-primary",
    PRIMARY_OUTLINE = "btn btn-outline-primary",
    WARNING = "btn btn-warning",
    WARNING_OUTLINE = "btn btn-outline-warning",
    SECONDARY = "btn btn-secondary",
}

/**
 *  ENUM_CARD_STATUS
 *  @description Enum object, set of cards status
 */
export enum CardStatusEnum {
    HIDDEN = "Hidden",
    LOCKED = "Locked",
    ACTIVE = "Active",
    ERROR = "Error",
    COMPLETED = "Completed",
    WARNING = "Warning",
}

/**
 *  BadgeIconEnum
 *  @description Enum object, set of icons to show in the card
 */
export enum BadgeIconEnum {
    Active = "bi bi-unlock",
    Locked = "bi bi-lock",
    Error = "bi bi-exclamation-octagon",
    Completed = "bi bi-check-circle ",
    Warning = "bi bi-clock"
}
