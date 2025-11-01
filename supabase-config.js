// StyleWise Supabase Configuration
// Separate configuration for website vs app to prevent conflicts

const supabaseConfig = {
    // Website Configuration (for password reset, email confirmation)
    website: {
        url: 'https://iehbnglwxtwxlveaeknp.supabase.co',
        anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllaGJuZ2x3eHR3eGx2ZWFla25wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MTE0NTIsImV4cCI6MjA2MjQ4NzQ1Mn0.652L15y6Nz0xVEWbuIQxbFAeb7yKK7Eravs_wphI2BU',
        redirectTo: 'https://styleswise.io/reset-password',
        siteUrl: 'https://styleswise.io'
    },
    
    // App Configuration (for OAuth flows)
    app: {
        url: 'https://iehbnglwxtwxlveaeknp.supabase.co',
        anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllaGJuZ2x3eHR3eGx2ZWFla25wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MTE0NTIsImV4cCI6MjA2MjQ4NzQ1Mn0.652L15y6Nz0xVEWbuIQxbFAeb7yKK7Eravs_wphI2BU',
        redirectTo: 'stylewise://auth/callback',
        deepLinkScheme: 'stylewise://'
    }
};

// Export for use in different contexts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = supabaseConfig;
} else if (typeof window !== 'undefined') {
    window.supabaseConfig = supabaseConfig;
}



