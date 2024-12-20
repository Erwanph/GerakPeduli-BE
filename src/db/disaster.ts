import mongoose from "mongoose";
import Disaster from "../models/disaster";

// Definisi Tipe untuk Data Disaster
export interface Disaster {
    fatalities: number;
    volunteers: number;
    weather: string;
    location: string;
    brokenFacilities: number;
    latitude: number;
    longitude: number;
    createdAt?: Date;
}

// Definisi Schema
const DisasterSchema = new mongoose.Schema({
    fatalities: { type: Number, required: true },
    volunteers: { type: Number, required: true },
    weather: { type: String, required: true },
    location: { type: String, required: true },
    brokenFacilities: { type: Number, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

// Model MongoDB
export const DisasterModel = mongoose.model("Disaster", DisasterSchema);

// Fungsi untuk mengambil semua data
export const getData = async (): Promise<Disaster[]> => {
    try {
        const disasters = await DisasterModel.find().sort({ createdAt: -1 });
        return disasters;
    } catch (error) {
        throw new Error("Gagal mengambil data: " + error.message);
    }
};

// Fungsi untuk menambahkan data baru
export const postData = async (data: Disaster): Promise<Disaster> => {
    try {
        const newDisaster = new DisasterModel(data);
        const savedDisaster = await newDisaster.save();
        return savedDisaster.toObject();
    } catch (error) {
        throw new Error("Gagal menambahkan data: " + error.message);
    }
};