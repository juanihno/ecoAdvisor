import { View, Text } from "react-native";
import React from "react";
import "@expo/match-media";
import { useMediaQuery } from "react-responsive";

export const isTabletOrMobileDevice = useMediaQuery({
  query: "(max-device-width: 1224px)",
});
export const isDeviceWidth295_359 = useMediaQuery({
  query: "(min-device-width:295) and (max-device-width:359)",
});
export const isDeviceWidth370_391 = useMediaQuery({
  query: "(min-device-width:370) and (max-device-width:390)",
});
export const isDeviceWidth375_811 = useMediaQuery({
  query: "(min-device-width:375) and (max-device-height:811)",
});
export const isDeviceWidth360_374 = useMediaQuery({
  query: "(min-device-width:360) and (max-device-width:374)",
});
