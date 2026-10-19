import React from 'react';

/**
 * @interface GoogleCallbackResponse
 * @description Response object returned by Google Sign-In API after successful authentication
 * @property {string} clientId - The client ID used for authentication
 * @property {string} client_id - Alternative client ID property (Google API provides both formats)
 * @property {string} credential - JWT token containing user information
 * @property {string} select_by - Method by which the user was selected
 */
export interface GoogleCallbackResponse {
  clientId: string;
  client_id: string;
  credential: string;
  select_by: string;
}

/**
 * @interface GoogleSignInProps
 * @description Props for the GoogleSignIn component
 */
interface GoogleSignInProps {
  /**
   * @property {string} GOOGLE_CLIENT_ID - This field is your application's client ID, which is found and created in the Google Cloud console.
   *
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#client_id
   * @required
   */
  GOOGLE_CLIENT_ID: string;

  /**
   * @property {function} onSuccessCallback - Callback function executed after successful Google authentication
   *
   * @param {GoogleCallbackResponse} response - The response object from Google containing user information
   *
   * @description This field is the JavaScript function that handles the ID token returned from the One Tap prompt or the pop-up window.
   * This attribute is required if Google One Tap or the Sign In With Google button popup UX mode is used
   *
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#callback
   * @required
   */
  onSuccessCallback(response: GoogleCallbackResponse): void;

  /**
   * @property {Object} configuration - Optional configuration options for Google Sign-In
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#IdConfiguration
   */
  configuration?: {
    /**@property {boolean} auto_select - Whether to automatically select the first Google account */
    auto_select?: boolean;
    /** @property {boolean} cancel_on_tap_outside - Whether to cancel the prompt when user clicks outside */
    cancel_on_tap_outside?: boolean;
    /** @property {string} context - Context in which the button is displayed */
    context?: 'signin' | 'signup' | 'use';
    /** @property {URL} login_uri - URI to which the authorization code is sent */
    login_uri?: URL;
    /** @property {string} nonce - Random string for security purposes */
    nonce?: string;
    /** @property {string} prompt_parent_id - ID of the element to contain the prompt */
    prompt_parent_id?: string;
    /** @property {string} state_cookie_domain - Domain for the state cookie */
    state_cookie_domain?: string;
    /** @property {string} ux_mode - UX flow mode */
    ux_mode?: 'popup' | 'redirect';
    /** @property {string|Array<string>} allowed_parent_origin - Origins allowed to embed the button */
    allowed_parent_origin?: string | Array<string>;
    /** @property {boolean} itp_support - Whether to enable ITP support */
    itp_support?: boolean;
    /** @property {string} login_hint - Email address or sub identifier */
    login_hint?: string;
    /** @property {string} hd - Hosted domain (G Suite accounts) */
    hd?: string;
    /** @property {boolean} use_fedcm_for_prompt - Whether to use FedCM for the prompt */
    use_fedcm_for_prompt?: boolean;
    /** @property {boolean} use_fedcm_for_button - Whether to use FedCM for the button */
    use_fedcm_for_button?: boolean;
    /** @property {boolean} button_auto_select - Whether to auto-select the button */
    button_auto_select?: boolean;
    /** @property {function} native_callback - Callback for native flow */
    native_callback?(): void;
    /** @property {function} intermediate_iframe_close_callback - Callback when intermediate iframe closes */
    intermediate_iframe_close_callback?(): void;
  };

  /**
   * @property {Object} buttonOptions - Optional customization options for the Google Sign-In button
   * @see https://developers.google.com/identity/gsi/web/reference/js-reference#google.accounts.id.renderButton
   */
  buttonOptions?: {
    /** @property {string} type - Type of button to display */
    type?: 'icon' | 'standard';
    /** @property {string} theme - Color theme of the button */
    theme?: 'outline' | 'filled_blue' | 'filled_black';
    /** @property {string} size - Size of the button */
    size?: 'small' | 'medium' | 'large';
    /** @property {string} text - Text to display on the button */
    text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
    /** @property {string} shape - Shape of the button */
    shape?: 'rectangular' | 'pill' | 'circle' | 'square';
    /** @property {string} logo_alignment - Alignment of the Google logo */
    logo_alignment?: 'left' | 'center';
    /** @property {string} locale - Locale for the button text */
    locale?: string;
  };

  /** @property {CSSProperties} - Styling for Button Container (!!! Not the Actual Button !!!!) */
  containerStyles?: React.CSSProperties;

  /** @property {string} - classnames for styling. Useful if using tailwindcss  */
  className?: string;
}

/**
 * @component GoogleSignIn
 * @author Prakash Poudel
 * @description A React component that renders a Google Sign-In button and handles the authentication flow
 *
 * This component dynamically loads the Google Identity Services JavaScript library and renders
 * a customizable Google Sign-In button. When clicked, it opens the Google authentication popup
 * and handles the authentication flow, calling the provided callback function with the user information.
 *
 * @example
 * ```tsx
 * import { GoogleSignIn, GoogleCallbackResponse } from './GoogleSignIn';
 *
 * function MyLoginPage() {
 *   const handleGoogleSignIn = (response: GoogleCallbackResponse) => {
 *     console.info('Google user info:', response);
 *     // Process the authentication on your backend
 *   };
 *
 *   return (
 *     <GoogleSignIn
 *       GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
 *       onSuccessCallback={handleGoogleSignIn}
 *       buttonOptions={{
 *         type: 'standard',
 *         theme: 'filled_blue',
 *         size: 'large',
 *         text: 'signin_with',
 *         shape: 'rectangular'
 *       }}
 *     />
 *   );
 * }
 * ```
 *
 * @param {Object} props - Component props
 * @param {string} props.GOOGLE_CLIENT_ID - Google OAuth client ID obtained from Google Cloud Console
 * @param {Function} props.onSuccessCallback - Callback function executed after successful authentication
 * @param {Object} [props.configuration] - Optional configuration options for Google Sign-In
 * @param {Object} [props.buttonOptions] - Optional customization options for the Google Sign-In button
 * @returns {JSX.Element} A React component that renders a Google Sign-In button
 */
export function GoogleSignIn({
  GOOGLE_CLIENT_ID,
  onSuccessCallback,
  configuration = {
    auto_select: false,
  },
  buttonOptions = {
    type: 'standard',
    shape: 'rectangular',
  },
  containerStyles,
  className,
}: GoogleSignInProps): JSX.Element | null {
  /**
   * Effect to initialize Google Sign-In
   *
   * This effect:
   * 1. Dynamically loads the Google Identity Services JavaScript library
   * 2. Initializes the Google Sign-In with the provided client ID and callback
   * 3. Renders the Google Sign-In button in the designated container
   * 4. Cleans up the script when the component unmounts
   */
  React.useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return;
    /**
     * Loads the Google Identity Services JavaScript library
     * @function loadGoogleScript
     * @private
     */
    const loadGoogleScript = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        if (window.google) {
          // @ts-ignore
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: onSuccessCallback,
            ...configuration,
          });

          // @ts-ignore
          window.google.accounts.id.renderButton(
            document.getElementById('google_sign_in_btn')!,
            buttonOptions,
          );
        }
      };
    };

    loadGoogleScript();

    return () => {
      // Clean up script if component unmounts
      const scriptTag = document.querySelector(
        'script[src="https://accounts.google.com/gsi/client"]',
      );
      if (scriptTag) {
        scriptTag.remove();
      }
    };
  }, [GOOGLE_CLIENT_ID]);

  /**
   * return nothing if GOOGLE_CLIENT_ID is not provided
   */
  if (!GOOGLE_CLIENT_ID) {
    return null;
  }
  /**
   * Renders the container for the Google Sign-In button
   * The actual button will be rendered by the Google Identity Services library
   * @returns {JSX.Element} A div container with the Google Sign-In button
   */
  return (
    <div style={containerStyles} className={className}>
      <div id="google_sign_in_btn"></div>
    </div>
  );
}
