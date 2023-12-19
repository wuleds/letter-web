import {notification} from "ant-design-vue";

export const openNotification = (title, description) => {
    notification.open({
        message: title,
        description: description,
        onClick: () => {
            console.log('Notification Clicked');
        },
    });
};