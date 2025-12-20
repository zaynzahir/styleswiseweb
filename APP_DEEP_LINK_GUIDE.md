# StyleWise App Deep Link Configuration Guide

## 🚨 **CRITICAL: App Deep Link Handler Configuration**

To fix the password reset redirect issue, your app's deep link handler must be configured correctly.

### **Current Problem**
- Password reset emails redirect to the app instead of the website
- App is intercepting all `https://styleswise.io` URLs
- This breaks the password reset flow

### **Required App Configuration**

#### **1. Deep Link Scheme Registration**
```xml
<!-- Android: android/app/src/main/AndroidManifest.xml -->
<activity
    android:name=".MainActivity"
    android:exported="true"
    android:launchMode="singleTop">
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <!-- ONLY handle app-specific URLs -->
        <data android:scheme="stylewise" />
    </intent-filter>
</activity>
```

```xml
<!-- iOS: ios/Runner/Info.plist -->
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLName</key>
        <string>stylewise</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>stylewise</string>
        </array>
    </dict>
</array>
```

#### **2. Deep Link Handler Logic**
```dart
// Flutter Deep Link Handler
class DeepLinkHandler {
  static void handleIncomingLink(String link) {
    print('Received deep link: $link');
    
    // ONLY process app-specific URLs
    if (link.startsWith('stylewise://')) {
      _handleAppDeepLink(link);
    } else if (link.startsWith('https://styleswise.io')) {
      // DO NOT intercept website URLs
      // Let them open in browser
      _openInBrowser(link);
    }
  }
  
  static void _handleAppDeepLink(String link) {
    // Only handle OAuth callbacks
    if (link.contains('auth/callback')) {
      _handleOAuthCallback(link);
    }
    // Ignore all other app URLs
  }
  
  static void _openInBrowser(String link) {
    // Open website URLs in browser, not in app
    launchUrl(Uri.parse(link), mode: LaunchMode.externalApplication);
  }
}
```

#### **3. Supabase Configuration in App**
```dart
// App Supabase Configuration
final supabase = SupabaseClient(
  'https://iehbnglwxtwxlveaeknp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllaGJuZ2x3eHR3eGx2ZWFla25wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MTE0NTIsImV4cCI6MjA2MjQ4NzQ1Mn0.652L15y6Nz0xVEWbuIQxbFAeb7yKK7Eravs_wphI2BU',
  authOptions: FlutterAuthClientOptions(
    authFlowType: AuthFlowType.pkce,
    // ONLY handle OAuth redirects
    redirectTo: 'stylewise://auth/callback',
  ),
);
```

### **4. Supabase Project Settings**

#### **Authentication Settings:**
```
Site URL: https://styleswise.io
Redirect URLs:
  - https://styleswise.io/reset-password
  - https://styleswise.io/confirm-email
  - stylewise://auth/callback
```

#### **Email Templates:**
```
Password Reset Email:
- Redirect URL: https://styleswise.io/reset-password
- NOT: stylewise://auth/callback

Email Confirmation:
- Redirect URL: https://styleswise.io/confirm-email
- NOT: stylewise://auth/callback
```

### **5. Testing Checklist**

#### **Password Reset Flow:**
- [ ] User requests password reset
- [ ] Email contains `https://styleswise.io/reset-password` link
- [ ] Link opens in browser (NOT in app)
- [ ] User can reset password on website
- [ ] App is NOT opened during this process

#### **OAuth Flow:**
- [ ] User clicks "Sign in with Google" in app
- [ ] OAuth redirects to `stylewise://auth/callback`
- [ ] App handles the callback
- [ ] User is signed in to app

### **6. Common Mistakes to Avoid**

❌ **DON'T:**
- Intercept `https://styleswise.io` URLs in app
- Use website URLs for OAuth callbacks
- Mix website and app redirect URLs

✅ **DO:**
- Only handle `stylewise://` URLs in app
- Use `https://styleswise.io` URLs for website flows
- Keep OAuth and password reset flows separate

### **7. Debugging**

#### **Check App Deep Link Registration:**
```bash
# Android
adb shell am start -W -a android.intent.action.VIEW -d "stylewise://auth/callback" com.stylewise.app

# iOS
xcrun simctl openurl booted "stylewise://auth/callback"
```

#### **Test Website URLs:**
```bash
# These should open in browser, NOT in app
open "https://styleswise.io/reset-password"
open "https://styleswise.io/confirm-email"
```

### **8. Implementation Priority**

1. **IMMEDIATE**: Update app deep link handler to NOT intercept website URLs
2. **IMMEDIATE**: Configure Supabase email templates to use website URLs
3. **IMMEDIATE**: Test password reset flow end-to-end
4. **FOLLOW-UP**: Update app OAuth configuration if needed

---

## 🎯 **Expected Result**

After implementing these changes:
- ✅ Password reset emails → Website (browser)
- ✅ OAuth callbacks → App
- ✅ No conflicts between flows
- ✅ Users can reset passwords successfully




