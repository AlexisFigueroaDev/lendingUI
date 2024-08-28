import { palette } from './palette';
import { GetFlattenKeys } from '../utils/types/flatten-keys';

export const colors = {
  primary: {
    20: palette.cyberLavender,
    40: palette.winterspringLilac,
    60: palette.baingani,
    80: palette.shadyNeonBlue,
    100: palette.blurple,
    400: palette.coldLips,
  },
  secondaryOne: {
    20: palette.placeboSky,
    40: palette.freshAir,
    60: palette.libraBlueMorpho,
    80: palette.cyanite,
    100: palette.germanderSpeedwell,
  },
  secondaryTwo: {
    20: palette.distantHorizon,
    40: palette.tadornaTeal,
    60: palette.greenishTeal,
    80: palette.greedoGreen,
    100: palette.pictureBookGreen,
  },
  secondaryThree: {
    20: palette.granulatedSugar,
    40: palette.brightHalo,
    60: palette.mySin,
    80: palette.princetonOrange,
    100: palette.vividOrange,
    120: palette.danger,
  },
  secondaryFour: {
    20: palette.seaSaltSherbet,
    40: palette.peachBurst,
    60: palette.glowingBrakeDisc,
    80: palette.hawthornBerry,
    100: palette.scabRed,
  },
  secondaryFive: {
    20: palette.palePhthaloBlue,
    40: palette.coldLips,
    60: palette.blueOysterCult,
    80: palette.veteransDayBlue,
    100: palette.internationalBlue,
  },
  primaryDark: {
    0: palette.white,
    10: palette.whiteSolid,
    20: palette.lavenderMist,
    30: palette.cheerfulWhisper,
    40: palette.periwinklePowder,
    50: palette.lovelyLilac,
    60: palette.velvetCurtain,
    70: palette.deepLavender,
    80: palette.mangosteen,
    90: palette.midnightExpress,
    100: palette.corbeau,
  },
  backgrounds: {
    0: palette.white,
    20: palette.coolBlooded,
    40: palette.everest,
    60: palette.neonBoneyard,
    80: palette.icyPlains,
    90: palette.meltingGlacier,
  },
  loyaltyOne: {
    20: palette.softMint,
    40: palette.aeroBlue,
    100: palette.enamelledDragon,
  },
  loyaltyTwo: {
    20: palette.meltingGlacier,
    40: palette.lightOpale,
    100: palette.northWind,
  },
  loyaltyThree: {
    20: palette.coldWhite,
    40: palette.frostProof,
    100: palette.waterNymph,
  },
  loyaltyFour: {
    20: palette.aliceBlue,
    40: palette.iceCastle,
    100: palette.droplet,
  },
  loyaltyFive: {
    20: palette.foundationWhite,
    40: palette.transparentBlue,
    100: palette.shyMoment,
  },
  loyaltySix: {
    20: palette.sugarCrystal,
    40: palette.lavenderSavor,
    100: palette.lavenderCream,
  },
};

export type ColorsType = typeof colors;
export type KeyColors = keyof ColorsType;

export type PaletteColorsMap = GetFlattenKeys<ColorsType>;
