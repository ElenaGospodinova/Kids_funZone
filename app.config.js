import 'dotenv/config';

export default ({ config }) => {
  const expoConfig = config.expo || {};
  const extraConfig = expoConfig.extra || {};

  return {
    ...config,
    expo: {
      ...expoConfig,
      extra: {
        ...extraConfig,
        eas: {
          projectId: "9e94a618-397c-4e64-afcc-67669b5c7afb"
        }
      },
      android: {
        ...expoConfig.android,
        package: "com.kidsfunzone",  // Replace with your actual domain and app name
      }
    }
  };
};
