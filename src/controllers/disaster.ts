import { Request, Response } from "express";
import { getData, postData } from "../db/disaster";
import { Disaster } from "../db/disaster"; 

// Handler untuk mengambil semua data disaster
export const getDisastersHandler = async (req: Request, res: Response): Promise<any> =>{
    try {
        const disasters = await getData(); // Menggunakan fungsi getData dari db
        return res.status(200).json(disasters);
    } catch (error) {
        console.error("Error in getDisastersHandler:", error);
        return res.status(500).json({ message: "Error fetching disaster data" });
    }
};

// Handler untuk menambahkan data disaster baru
export const createDisasterHandler = async (req: Request, res: Response) : Promise<any> => {
    try {
        const disasterData: Disaster = req.body; // Pastikan body sesuai tipe Disaster
        const newDisaster = await postData(disasterData); // Menggunakan fungsi postData dari db
        return res.status(201).json(newDisaster);
    } catch (error) {
        console.error("Error in createDisasterHandler:", error);
        return res.status(400).json({ message: "Error creating disaster entry" });
    }
};
