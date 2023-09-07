"use client"
import { useContext } from "react";
import { DataContext } from "../context/info";

export const useData = () => useContext(DataContext)