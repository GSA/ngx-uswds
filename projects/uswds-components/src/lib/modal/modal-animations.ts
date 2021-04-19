import {
  animate,
  style,
  transition,
  trigger,
  AnimationTriggerMetadata,
} from '@angular/animations';

const animationBody = [
  transition('* => enter',
    [
      style({opacity: 0, transform: 'scale(0.7)'}),
      animate('150ms cubic-bezier(0, 0, 0.2, 1)',
        style({transform: 'none', opacity: 1}))
    ]
  ),
  transition('* => slideEnter', [
    style({right: '-15rem'}),
    animate('1s', style({right: '0rem'}))
  ])
];

/**
 * Animations used by SdsDialog.
 * @docs-private
 */
export const usaDialogAnimations: {
  readonly dialogContainer: AnimationTriggerMetadata;
} = {
  /** Animation that is applied on the dialog container by defalt. */
  dialogContainer: trigger('dialogContainer', animationBody)
};
