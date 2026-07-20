# Human Interface Guidelines signals

The Human Interface Guidelines shape reviewer expectations about whether an app feels like a native, well-behaved iOS or macOS app. Most HIG judgement needs the running app; from source you can detect signals and flag risks, always weighting them as advisory and often `requires-manual-verification`.

## Source-detectable signals

- **Safe areas and layout**: use of safe-area insets; content not hidden behind the notch, Dynamic Island, or home indicator.
- **Dynamic Type and accessibility**: support for scalable text and VoiceOver labels; hard-coded font sizes and missing accessibility labels are risks. Coordinate with `$sills-audit-accessibility` when it is also running.
- **Dark mode**: appearance handling rather than hard-coded colors.
- **Touch targets**: controls large enough to tap; very small interactive elements are a usability risk.
- **Navigation patterns**: standard navigation and modality rather than custom paradigms that confuse reviewers.
- **Orientation and device support**: declared support matches actual layout behaviour.

## What needs the running app

First-launch experience, permission-prompt timing and context, empty and error states, loading behaviour, and overall polish are judged live. When no build or runtime is available, list these as untested review surfaces rather than passing them.

## Discipline

HIG issues are rarely hard rejections on their own, but weak platform conformance combines with other findings to produce a "needs work before submission" outcome. Report HIG signals as advisory findings with concrete, specific recommendations, and do not overstate confidence from source alone.
