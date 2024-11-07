import { axiosInstance } from "@/context/store/AuthStore";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

async function registerForPushNotificationsAsync(): Promise<
  string | undefined
> {
  let token;
  try {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Permission not granted to receive push notifications!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("Push token:", token);
  } catch (error) {
    console.error("Failed to get push token:", error);
  }
  return token;
}

const LoadNotification: React.FC<{
  setExpoPushToken: (token: string) => void;
}> = ({ setExpoPushToken }) => {
  useEffect(() => {
    registerForPushNotificationsAsync().then(async (token) => {
      if (token) {
        setExpoPushToken(token);

        // send notification to backend
        try {
          await axiosInstance.post("/user/pushtoken", { token });
        } catch (error) {
          console.error("Failed to send push token to backend:", error);
        }
      }
    });
    // Handle notification responses
    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification received");
      }
    );
    // Handle notification actions
    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification response:");
      });

    // Stop listening for notifications when the component unmounts
    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  return null;
};

export default LoadNotification;
