import mongoose from 'mongoose';

// Definisi schema untuk koleksi Disaster
const disasterSchema = new mongoose.Schema({
    fatalities: {
        type: Number,
        required: true, // Wajib diisi
    },
    volunteers: {
        type: Number,
        required: true, // Wajib diisi
    },
    weather: {
        type: String,
        required: true, // Wajib diisi
    },
    location: {
        type: String,
        required: true, // Wajib diisi
    },
    brokenFacilities: {
        type: Number,
        required: true, // Wajib diisi
    },
    latitude: {
        type: Number,
        required: true, // Wajib diisi
    },
    longitude: {
        type: Number,
        required: true, // Wajib diisi
    },
    timestamp: {
        type: Date,
        default: Date.now, // Default: waktu saat ini
    },
});

// Membuat model berdasarkan schema
const Disaster = mongoose.model('Disaster', disasterSchema);

// Ekspor model
export default Disaster;
