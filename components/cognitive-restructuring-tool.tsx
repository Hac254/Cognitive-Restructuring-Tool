'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, Brain, Lightbulb, Smile } from 'lucide-react'
import Image from 'next/image'
import logoImage from './logo.png'

type Thought = {
  situation: string
  automaticThought: string
  emotionIntensity: number
  evidence: string
  counterEvidence: string
  balancedPerspective: string
}

export default function CognitiveRestructuringTool() {
  const [showSplash, setShowSplash] = useState(true)
  const [step, setStep] = useState(1)
  const [thought, setThought] = useState<Thought>({
    situation: '',
    automaticThought: '',
    emotionIntensity: 5,
    evidence: '',
    counterEvidence: '',
    balancedPerspective: ''
  })

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 4000) // Splash screen shows for 4 seconds
    return () => clearTimeout(timer)
  }, [])

  const handleNext = () => {
    if (step < 6) setStep(step + 1)
  }

  const handleComplete = () => {
    alert('Great job! You\'ve completed the cognitive restructuring process.')
    setStep(1)
    setThought({situation: '',automaticThought: '',emotionIntensity: 5,evidence: '', counterEvidence: '',balancedPerspective: ''})
  }

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  const getStepIcon = (currentStep: number) => {
    switch(currentStep) {
      case 1:
      case 2:
        return <Brain className="w-8 h-8 text-pink-500" />
      case 3:
        return <Smile className="w-8 h-8 text-orange-500" />
      case 4:
      case 5:
        return <Lightbulb className="w-8 h-8 text-pink-500" />
      default:
        return <Brain className="w-8 h-8 text-pink-500" />
    }
  }

  if (showSplash) {
    return (
      <motion.div 
        className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-pink-100 to-orange-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Image src={logoImage} alt="Mind Reframe Logo" width={200} height={200} className="mb-8 rounded-full shadow-lg" />
        <h1 className="text-4xl font-bold text-pink-600 mb-4">Mind Reframe</h1>
        <p className="text-xl text-black text-center max-w-md">A Cognitive-Restructuring Tool to help you reshape your thoughts and your mind. Your journey to cognitive clarity starts here.</p>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-pink-50 to-orange-50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-pink-600">
            Mind Reframe
          </CardTitle>
          <CardDescription className="text-lg text-black">
            Step {step} of 6: {getStepIcon(step)}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Progress value={(step / 6) * 100} className="mb-6" />
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" {...fadeIn}>
                <label htmlFor="situation" className="block text-lg font-medium text-black mb-2">
                  What situation triggered your thought?
                </label>
                <Textarea
                  id="situation"
                  value={thought.situation}
                  onChange={(e) => setThought({...thought, situation: e.target.value})}
                  placeholder="Describe the situation..."
                  className="w-full h-32 text-lg border-orange-300 focus:ring-pink-500"
                />
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="step2" {...fadeIn}>
                <label htmlFor="automaticThought" className="block text-lg font-medium text-black mb-2">
                  What automatic thought are you having?
                </label>
                <Textarea
                  id="automaticThought"
                  value={thought.automaticThought}
                  onChange={(e) => setThought({...thought, automaticThought: e.target.value})}
                  placeholder="Write your automatic thought..."
                  className="w-full h-32 text-lg border-orange-300 focus:ring-pink-500"
                />
              </motion.div>
            )}
            {step === 3 && (
              <motion.div key="step3" {...fadeIn}>
                <label htmlFor="emotionIntensity" className="block text-lg font-medium text-black mb-2">
                  How intense is the emotion associated with this thought? (1-10)
                </label>
                <Slider
                  id="emotionIntensity"
                  min={1}
                  max={10}
                  step={1}
                  value={[thought.emotionIntensity]}
                  onValueChange={(value) => setThought({...thought, emotionIntensity: value[0]})}
                  className="w-full"
                />
                <p className="text-center text-2xl font-bold mt-4 text-orange-500">{thought.emotionIntensity}</p>
              </motion.div>
            )}
            {step === 4 && (
              <motion.div key="step4" {...fadeIn}>
                <label htmlFor="evidence" className="block text-lg font-medium text-black mb-2">
                  What evidence supports this thought?
                </label>
                <Textarea
                  id="evidence"
                  value={thought.evidence}
                  onChange={(e) => setThought({...thought, evidence: e.target.value})}
                  placeholder="List the evidence..."
                  className="w-full h-32 text-lg border-orange-300 focus:ring-pink-500"
                />
              </motion.div>
            )}
            {step === 5 && (
              <motion.div key="step5" {...fadeIn}>
                <label htmlFor="counterEvidence" className="block text-lg font-medium text-black mb-2">
                  What evidence goes against this thought?
                </label>
                <Textarea
                  id="counterEvidence"
                  value={thought.counterEvidence}
                  onChange={(e) => setThought({...thought, counterEvidence: e.target.value})}
                  placeholder="List counter-evidence..."
                  className="w-full h-32 text-lg border-orange-300 focus:ring-pink-500"
                />
              </motion.div>
            )}
            {step === 6 && (
              <motion.div key="step6" {...fadeIn}>
                <label htmlFor="balancedPerspective" className="block text-lg font-medium text-black mb-2">
                  What's a more balanced perspective?
                </label>
                <Textarea
                  id="balancedPerspective"
                  value={thought.balancedPerspective}
                  onChange={(e) => setThought({...thought, balancedPerspective: e.target.value})}
                  placeholder="Write a balanced perspective..."
                  className="w-full h-32 text-lg border-orange-300 focus:ring-pink-500"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex justify-between">
          {step < 6 ? (
            <Button 
              onClick={handleNext} 
              className="w-full bg-pink-500 hover:bg-pink-600 text-white"
              disabled={
                (step === 1 && !thought.situation) ||
                (step === 2 && !thought.automaticThought) ||
                (step === 4 && !thought.evidence) ||
                (step === 5 && !thought.counterEvidence)
              }
            >
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button 
              onClick={handleComplete}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white"
              disabled={!thought.balancedPerspective}
            >
              Complete <Lightbulb className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}