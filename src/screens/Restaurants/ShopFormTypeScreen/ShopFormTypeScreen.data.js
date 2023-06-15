import * as Yup from "yup";
import "yup-phone-lite";
// import Data from "../../../components/Restaurants/AddRestaurant/ShopCheckBox/ShopCheckBox.data";

export function initialValues() {
  return {
    BusinessType: "Shop",
    userId: "",
    ShopType: "",
    FoodProducts: {
      FullyVegan: false,
      FullyVegetarian: false,
      VegetarianOption: false,
      VeganOption: false,
      FreeRangeMeat: false,
      FreeRangeEggs: false,
      LocalFoodProducts: false,
      LocallyMade: false,
      NoAnimalTestedProducts: false,
      CrueltyFreeProducts: false,
      LocalMaterials: false,
      NoSingleUseItems: false,
      SecondHandProducts: false,
      RecicledMaterials: false,
      FreeOfChildLabour: false,
    },
    SupplierEnergy: {
      NonToxicCleaningProduct: false,
      ManagingWaterWaste: false,
      ManagingElectricityWaste: false,
      ReusableEnergy: false,
    },
    waste: {
      FullyPlasticBagFree: false,
      PlasticBagFree: false,
      PlasticPackagingFree: false,
      SellingReusableBags: false,
      WelcomeReusableBags: false,
      DedicatesRecyclingBins: false,
    },
  };
}
export function validationSchema() {
  return Yup.object().shape({
    BusinessType: Yup.string(),
    userId: Yup.string(),
    ShopType: Yup.string().required("Restaurant type is required"),
    FoodProducts: Yup.object({
      VegetarianOption: Yup.boolean(),
      VeganOption: Yup.boolean(),
      FreeRangeMeat: Yup.boolean(),
      FreeRangeEggs: Yup.boolean(),
      LocalFoodProducts: Yup.boolean(),
      LocallyMade: Yup.boolean(),
      NoAnimalTestedProducts: Yup.boolean(),
      CrueltyFreeProducts: Yup.boolean(),
      LocalMaterials: Yup.boolean(),
      NoSingleUseItems: Yup.boolean(),
      SecondHandProducts: Yup.boolean(),
      RecicledMaterials: Yup.boolean(),
      FreeOfChildLabour: Yup.boolean(),
    }),
    SupplierEnergy: Yup.object({
      NonToxicCleaningProduct: Yup.boolean(),
      ManagingWaterWaste: Yup.boolean(),
      ManagingElectricityWaste: Yup.boolean(),
      ReusableEnergy: Yup.boolean(),
    }),
    waste: Yup.object({
      PlasticBagFree: Yup.boolean(),
      PlasticPackagingFree: Yup.boolean(),
      SellingReusableBags: Yup.boolean(),
      WelcomeReusableBags: Yup.boolean(),
      DedicatesRecyclingBins: Yup.boolean(),
    }),
  });
}
