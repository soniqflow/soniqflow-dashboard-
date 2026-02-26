"use client"

import { useEffect, useState } from "react"
import {
  generateProcessingStats,
  generateCPUMemory,
  generateAudioJobs,
  generateSpectralData,
  generateTimeSeriesData,
  generateStatsKPIs,
} from "@/lib/mock-data"

export function useProcessingStats(interval = 2000) {
  const [data, setData] = useState(generateProcessingStats())

  useEffect(() => {
    const timer = setInterval(() => {
      setData(generateProcessingStats())
    }, interval)

    return () => clearInterval(timer)
  }, [interval])

  return data
}

export function useCPUMemory(interval = 3000) {
  const [data, setData] = useState(generateCPUMemory())

  useEffect(() => {
    const timer = setInterval(() => {
      setData(generateCPUMemory())
    }, interval)

    return () => clearInterval(timer)
  }, [interval])

  return data
}

export function useAudioJobs(interval = 5000) {
  const [data, setData] = useState(generateAudioJobs())

  useEffect(() => {
    const timer = setInterval(() => {
      setData(generateAudioJobs())
    }, interval)

    return () => clearInterval(timer)
  }, [interval])

  return data
}

export function useSpectralData(interval = 1000) {
  const [data, setData] = useState(generateSpectralData())

  useEffect(() => {
    const timer = setInterval(() => {
      setData(generateSpectralData())
    }, interval)

    return () => clearInterval(timer)
  }, [interval])

  return data
}

export function useTimeSeriesData(interval = 6000) {
  const [data, setData] = useState(generateTimeSeriesData())

  useEffect(() => {
    const timer = setInterval(() => {
      setData(generateTimeSeriesData())
    }, interval)

    return () => clearInterval(timer)
  }, [interval])

  return data
}

export function useStatsKPIs(interval = 4000) {
  const [data, setData] = useState(generateStatsKPIs())

  useEffect(() => {
    const timer = setInterval(() => {
      setData(generateStatsKPIs())
    }, interval)

    return () => clearInterval(timer)
  }, [interval])

  return data
}
