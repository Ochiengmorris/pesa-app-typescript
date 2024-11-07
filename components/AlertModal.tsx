import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type AlertModalProps = {
  showModal: boolean;
  setShowModal: (visible: boolean) => void;
  title: string;
  message: string;
  leftAction?: () => void;
  rightAction?: () => void;
  leftActionText?: string;
  rightActionText?: string;
};

const AlertModal = ({
  showModal,
  setShowModal,
  title,
  message,
  leftAction,
  rightAction,
  leftActionText,
  rightActionText,
}: AlertModalProps) => {
  return (
    <Modal
      visible={showModal}
      transparent
      onRequestClose={() => setShowModal(false)}
      animationType="fade"
    >
      <View style={styles.centered_view}>
        <View style={styles.modal_view}>
          <View style={styles.text_view}>
            <Text style={styles.title_text}>{title}</Text>
          </View>
          <Text style={styles.message_text}>{message}</Text>
          <View style={styles.button_view}>
            {leftAction && (
              <TouchableOpacity
                style={[
                  styles.cancel_button,
                  { borderColor: "hsl(7, 91%, 90%)" },
                ]}
                activeOpacity={0.4}
                onPress={leftAction}
              >
                <Text style={styles.button_text}>{leftActionText}</Text>
              </TouchableOpacity>
            )}
            {/* Add your other button here */}
            {rightAction && (
              <TouchableOpacity
                style={[
                  styles.cancel_button,
                  { borderColor: "hsl(7, 91%, 90%)" },
                ]}
                activeOpacity={0.4}
                onPress={rightAction}
              >
                <Text style={styles.button_text}>{rightActionText}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  centered_view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal_view: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "80%",
  },
  text_view: {
    marginBottom: 5,
  },
  title_text: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
  },
  message_text: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
  button_view: {
    marginTop: 10,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    // borderTopWidth: 1,
    gap: 16,
  },
  button_text: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
  cancel_button: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flex: 1,
  },
});
export default AlertModal;
