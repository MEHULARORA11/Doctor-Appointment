import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });
dotenv.config({ path: path.join(process.cwd(), 'api', '.env') });
dotenv.config({ path: path.join(__dirname, '../../..', '.env') });

const clientUrl =
    process.env.NODE_ENV === "development"
        ? (process.env.CLIENT_LOCAL_URL || process.env.CLIENT__LOCAL_URL || 'http://localhost:3000')
        : (process.env.CLIENT_URL || process.env.CLIENT_LIVE_URL || 'http://localhost:3000');

const showErrorDetails =
    process.env.NODE_ENV !== 'production' ||
    process.env.SHOW_ERROR_DETAILS === 'true' ||
    process.env.VERCEL_ENV === 'preview';

export default {
    env: process.env.NODE_ENV || 'production',
    showErrorDetails,
    port: process.env.PORT || 5050,
    default_doctor_pass: process.env.DOCTOR_PASS || 'Doctor@123456',
    clientUrl: clientUrl,
    jwt: {
        secret: process.env.JWT_SECRET || process.env.JWT_SCRET || 'doctor_appointment_jwt_secret_key_2026_super_secure',
        JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || process.env.JWT_EXPIRED_IN || '7d',
        refresh_secret:
            process.env.JWT_REFRESH_SECRET || process.env.JWT_REFRESH_SCRET || 'doctor_appointment_jwt_refresh_secret_key_2026_super_secure',
    },
    cloudinary: {
        name: process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUD_NAME || process.env.CLOUND_NAME || '',
        key: process.env.CLOUDINARY_API_KEY || process.env.API_KEY || '',
        secret: process.env.CLOUDINARY_API_SECRET || process.env.API_SECRET || ''
    },
    emailPass: process.env.EMAIL_PASS || '',
    adminEmail: process.env.ADMIN_EMAIL || 'admin@doctorappointment.com',
    gmail_app_Email: process.env.GMAIL_APP_EMAIL || '',
    defaultAdminDoctor: process.env.DEFAULT_ADMIN_DOCTOR || process.env.DEFULT_ADMIN_DOCTOR || '',
    backendLiveUrl: process.env.BACKEND_LIVE_URL || '',
    backendLocalUrl: process.env.BACKEND_LOCAL_URL || 'http://localhost:5050'
}