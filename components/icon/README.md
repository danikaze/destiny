This component allows to render icons from svg characters in a font.

To edit the component to add more icons, generate the font from https://icomoon.io and:

- Uncompress the `fonts` folder into [/assets/fonts](../../assets/fonts) (as `icofont.xxx`)
- Update [icon.module.scss](./icon.module.scss) with the new definitions
- Add the new icon names (without the `icon-` prefix) in the `IconType` in [index.tsx](./index.tsx)

This step was also needed to install the new fonts:

- Add [styles/icofont.scss](../../styles/icofont.scss) to be loaded by [\_app.tsx](../../pages/_app.tsx)
