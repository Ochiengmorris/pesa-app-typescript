import { icons } from "@/constants";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Text, View } from "react-native";

type TabIconProps = {
  icon: keyof typeof icons; // Ensures 'icon' matches a key in 'icons' from "@/constants"
  color: string;
  name: string;
  focused: boolean;
};

const TabIcon = ({ icon, color, name, focused }: TabIconProps) => {
  return (
    <View className="items-center justify-center gap-1">
      <Image
        source={icons[icon]}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />

      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-sm`}
        style={{ color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#752fce",
          tabBarInactiveTintColor: "#373737",
          tabBarStyle: {
            backgroundColor: "#d1d1d9",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            height: 60,
            position: "absolute",
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <TabIcon
                name="Home"
                color={color}
                focused={focused}
                icon={"home"}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="wallet"
          options={{
            title: "My Wallet",
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <TabIcon
                name="Wallet"
                color={color}
                focused={focused}
                icon={"wallet"}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="bills"
          options={{
            title: "Bills",
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <TabIcon
                name="Bills"
                color={color}
                focused={focused}
                icon={"copy_alt"}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="analytics"
          options={{
            title: "Analytics",
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <TabIcon
                name="Analytics"
                color={color}
                focused={focused}
                icon={"chart_histogram"}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <TabIcon
                name="Profile"
                color={color}
                focused={focused}
                icon={"user_outline"}
              />
            ),
          }}
        />
      </Tabs>
      <StatusBar style="dark" />
    </>
  );
};
export default TabsLayout;
