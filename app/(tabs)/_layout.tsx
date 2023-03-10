import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useTwColors } from "../shared/hooks";

export default function TabLayout() {
  const { accent, backgroundColor, textColor } = useTwColors();

  return (
    // TODO: add animations to the tabs (inspiration: expo go)
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: accent,
        tabBarStyle: {
          backgroundColor: backgroundColor,
        },
        tabBarLabelStyle: {
          color: textColor,
        },
        headerStyle: {
          backgroundColor: backgroundColor,
        },
        headerTitleStyle: {
          color: textColor,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Schedule",
          tabBarIcon: ({ color }) => (
            <Ionicons color={color} name="calendar" size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: "Clients",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons color={color} name="people-sharp" size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <Ionicons color={color} name="settings" size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
