import * as Yup from "yup";
import "yup-phone-lite";
// import Data from '../../../components/Restaurants/AddRestaurant/RestaurantCheckBox/RestaurantCheckboxesData.json';

export function initialValues() {
  return {
    BusinessType: "Restaurant",
    RestaurantType: "",
    coffee: {
      DiscountForUsingOwncup: false,
      ExtrachargeForSingleUseCup: false,
      MugCupLibrary: false,
      BiodegradableCups: false,
      BiodegradableLids: false,
      optionNotgetiingTheLids: false,
      plantBasedMilkOption: false,
    },
    menu: {
      VegetarianOptions: false,
      VeganOptions: false,
      OrganicFoodOption: false,
      UseOfFreeRangeMeat: false,
      UseOfFreeRangeEggs: false,
      LocalFood: false,
      SeasonalFood: false,
      PlantBasedMilkOption: false,
    },
    waste: {
      PlastiCupsFree: false,
      PlasticBagFree: false,
      PlasticStrawFree: false,
      PlasticCutleryFree: false,
      PlasticContainerFree: false,
      SellingReusableBags: false,
      SellingReusableCups: false,
      WelcomeReusableContainer: false,
      DiscountOnReusableContainer: false,
      FreeWaterRefill: false,
      DedicatesRecyclingBins: false,
    },
    supplier: {
      NonToxicCleaningProduct: false,
      ManagingWaterWaste: false,
      PlasticStrawFree: false,
      ManagingElectricityWaste: false,
      ReusableEnergy: false,
    },
    community: {
      TalkyTable: false,
      PetFriendly: false,
      FreeWifi: false,
      OrganizingCommunityEvents: false,
      FriendlyStaff: false,
    },
  };
}
export function validationSchema() {
  return Yup.object().shape({
    BusinessType: Yup.string(),
    RestaurantType: Yup.string().required("Restaurant type is required"),
    coffee: Yup.object({
      DiscountForUsingOwncup: Yup.boolean(),
      ExtrachargeForSingleUseCup: Yup.boolean(),
      MugCupLibrary: Yup.boolean(),
      BiodegradableCups: Yup.boolean(),
      BiodegradableLids: Yup.boolean(),
      optionNotgetiingTheLids: Yup.boolean(),
      plantBasedMilkOption: Yup.boolean(),
    }),
    menu: Yup.object({
      VegetarianOptions: Yup.boolean(),
      VeganOptions: Yup.boolean(),
      OrganicFoodOption: Yup.boolean(),
      UseOfFreeRangeMeat: Yup.boolean(),
      UseOfFreeRangeEggs: Yup.boolean(),
      LocalFood: Yup.boolean(),
      SeasonalFood: Yup.boolean(),
      PlantBasedMilkOption: Yup.boolean(),
    }),
    waste: Yup.object({
      PlastiCupsFree: Yup.boolean(),
      PlasticBagFree: Yup.boolean(),
      PlasticStrawFree: Yup.boolean(),
      PlasticCutleryFree: Yup.boolean(),
      PlasticContainerFree: Yup.boolean(),
      SellingReusableBags: Yup.boolean(),
      SellingReusableCups: Yup.boolean(),
      WelcomeReusableContainer: Yup.boolean(),
      DiscountOnReusableContainer: Yup.boolean(),
      FreeWaterRefill: Yup.boolean(),
      DedicatesRecyclingBins: Yup.boolean(),
    }),
    supplier: Yup.object({
      NonToxicCleaningProduct: Yup.boolean(),
      ManagingWaterWaste: Yup.boolean(),
      PlasticStrawFree: Yup.boolean(),
      ManagingElectricityWaste: Yup.boolean(),
      ReusableEnergy: Yup.boolean(),
    }),
    community: Yup.object({
      TalkyTable: Yup.boolean(),
      PetFriendly: Yup.boolean(),
      FreeWifi: Yup.boolean(),
      OrganizingCommunityEvents: Yup.boolean(),
      FriendlyStaff: Yup.boolean(),
    }),
  });
}
