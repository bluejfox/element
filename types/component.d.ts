import Vue from 'vue'

/** SetariaUI component common definition */
export declare class SetariaUIComponent extends Vue {
  /** Install component into Vue */
  static install (vue: typeof Vue): void
}

/** Component size definition for button, input, etc */
export type SetariaUIComponentSize = 'large' | 'medium' | 'small' | 'mini'

/** Horizontal alignment */
export type SetariaUIHorizontalAlignment = 'left' | 'center' | 'right'
