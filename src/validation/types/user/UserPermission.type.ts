import globalsConfig from "../../../configs/globals.config";

type UserPermission = keyof typeof globalsConfig.PERMISSIONS;

export default UserPermission;
