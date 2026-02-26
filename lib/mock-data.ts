// Mock data generator for real-time audio processing simulation
export function generateProcessingStats() {
  return {
    denoising: Math.floor(Math.random() * 100) + 20,
    dereverb: Math.floor(Math.random() * 100) + 15,
    enhancement: Math.floor(Math.random() * 100) + 30,
    superResolution: Math.floor(Math.random() * 100) + 10,
    echoCancellation: Math.floor(Math.random() * 100) + 25,
  }
}

export function generateCPUMemory() {
  return {
    cpu: Math.floor(Math.random() * 60) + 20,
    memory: Math.floor(Math.random() * 50) + 25,
    gpu: Math.floor(Math.random() * 70) + 15,
  }
}

export function generateAudioJobs() {
  const statuses = ["processing", "completed", "queued", "failed"] as const
  const names = [
    "interview_2024.wav",
    "podcast_episode_001.mp3",
    "conference_call.m4a",
    "voiceover_v2.wav",
    "meeting_recording.mp4",
  ]

  return Array.from({ length: 5 }, (_, i) => ({
    id: `job-${i}`,
    name: names[i % names.length],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    progress: Math.floor(Math.random() * 100),
    duration: Math.floor(Math.random() * 300) + 60,
  }))
}

export function generateSpectralData() {
  return Array.from({ length: 32 }, () => ({
    frequency: Math.random() * 100,
    magnitude: Math.random() * 100,
  }))
}

export function generateTimeSeriesData() {
  const now = Date.now()
  return Array.from({ length: 12 }, (_, i) => ({
    time: new Date(now - (11 - i) * 5 * 60000).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    quality: Math.floor(Math.random() * 30) + 65,
    processed: Math.floor(Math.random() * 50) + 30,
  }))
}

export function generateStatsKPIs() {
  return {
    filesProcessed: Math.floor(Math.random() * 500) + 100,
    hoursSaved: Math.floor(Math.random() * 200) + 50,
    totalDuration: "2,340h",
    avgQuality: Math.floor(Math.random() * 20) + 80,
  }
}
