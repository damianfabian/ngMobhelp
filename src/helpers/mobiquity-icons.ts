import { IconDefinition, IconPack, IconLookup, IconPrefix, IconName, IconPathData } from '@fortawesome/fontawesome-svg-core';
type MobPrefix = "mob";
type MobName = "logo";

interface MobDefinition {
    prefix: MobPrefix;
    iconName: MobName;
    icon: [
        number, number, string[], string, IconPathData
    ]
};

export const mobLogo : MobDefinition = {
    prefix: "mob",
    iconName: "logo",
    icon: [
        40, 40,
        [],
        null,
        'M22.779 15.656h-2.892c-.181 0-.335.126-.335.287 0 .735.546 1.366 1.311 1.607a8.36 8.36 0 0 1-2.143 2.346V23h-3.84l-.368-1.5a8.422 8.422 0 0 1-.747.033h-5.45c-.378 0-.75-.026-1.115-.075V23H3.36l-.586-3.583A8.315 8.315 0 0 1 8.315 4.902h5.45c.353 0 .701.022 1.043.065.247-.343.625-.57 1.047-.625l2.49-.321a1.81 1.81 0 0 1 1.895 2.506l-.29.675a2.127 2.127 0 0 1-.152.293 8.308 8.308 0 0 1 1.917 3.277h.92c.754 0 1.365.61 1.365 1.365v2.161c0 .705-.535 1.286-1.221 1.358zm-5.019-6.84a1.44 1.44 0 0 0-1.44 1.44v.054a1.44 1.44 0 0 0 2.88 0v-.055a1.44 1.44 0 0 0-1.44-1.44 z'
    ]
}

export const mob : any = {
    mobLogo: mobLogo
}

