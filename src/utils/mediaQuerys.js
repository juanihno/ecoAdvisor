import { View, Text } from "react-native";
import React from "react";
import "@expo/match-media";
import { useMediaQuery } from "react-responsive";

export const isTabletOrMobileDevice = useMediaQuery({
  query: "(max-device-width: 390px)",
});
export const isDeviceWidth295_369 = useMediaQuery({
  query: "(min-device-width:295px) and (max-device-width:359px)",
});
export const isDeviceWidth370_390 = useMediaQuery({
  query: "(min-device-width:370px) and (max-device-width:390px)",
});
export const isDeviceWidth391_811 = useMediaQuery({
  query: "(min-device-width:391px) and (max-device-height:811px)",
});
export const isDeviceWidth360_374 = useMediaQuery({
  query: "(min-device-width:360) and (max-device-width:374)",
});
