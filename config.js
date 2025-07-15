// StyleWise Email Confirmation Page Configuration
// Updated on 2025-06-29T16:34:02.729Z

const config = {
    // Supabase Configuration
    supabase: {
        url: 'https://iehbnglwxtwxlveaeknp.supabase.co',
        anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllaGJuZ2x3eHR3eGx2ZWFla25wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MTE0NTIsImV4cCI6MjA2MjQ4NzQ1Mn0.652L15y6Nz0xVEWbuIQxbFAeb7yKK7Eravs_wphI2BU'
    },
    
    // App Configuration
    app: {
        name: 'StyleWise',
        tagline: 'Your Personal Fashion Assistant',
        website: 'https://styleswise.io',
        supportEmail: 'support@styleswise.io',
        deepLinkScheme: 'stylewise://'
    },
    
    // URLs
    urls: {
        confirmEmail: 'https://styleswise.io/confirm-email',
        signup: 'https://styleswise.io/signup',
        resetPassword: 'https://styleswise.io/reset-password',
        website: 'https://styleswise.io'
    },
    
    // Brand Colors
    colors: {
        primary: '#667eea',
        secondary: '#764ba2',
        white: '#ffffff',
        success: '#48bb78',
        error: '#f56565',
        warning: '#ed8936'
    },
    
    // Messages
    messages: {
        loading: {
            title: 'Confirming Your Email',
            message: 'Please wait while we verify your email address...'
        },
        success: {
            title: 'Email Confirmed!',
            message: 'Welcome to StyleWise! Your email has been successfully confirmed.\n\nYou can now use all the features of your StyleWise account.'
        },
        error: {
            title: 'Confirmation Failed',
            message: 'We couldn\'t confirm your email address.\n\nThis might be because the link has expired or is invalid.\nPlease try signing up again or contact support.'
        },
        invalidLink: {
            title: 'Invalid Link',
            message: 'This confirmation link appears to be invalid or has expired.\n\nPlease check your email for the correct link, or try signing up again.'
        },
        passwordReset: {
            success: {
                title: 'Password Reset Complete!',
                message: 'Your password has been successfully reset.\n\nYou can now log in to your StyleWise account with your new password.'
            },
            error: {
                title: 'Password Reset Failed',
                message: 'We couldn\'t complete your password reset.\n\nThis might be because the link has expired or is invalid.\nPlease try requesting a new password reset.'
            }
        }
    }
};

// Export for use in HTML
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
} else {
    window.stylewiseConfig = config;
}