"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { FinancialData, Income, Asset, Liability, CreditCard, Recommendation } from "./types"
import { generateRecommendations } from "./ai-recommendations"

interface FinancialContextType {
  data: FinancialData
  addIncome: (income: Omit<Income, "id">) => void
  updateIncome: (id: string, income: Omit<Income, "id">) => void
  addAsset: (asset: Omit<Asset, "id">) => void
  updateAsset: (id: string, asset: Omit<Asset, "id">) => void
  addLiability: (liability: Omit<Liability, "id">) => void
  updateLiability: (id: string, liability: Omit<Liability, "id">) => void
  addCreditCard: (card: Omit<CreditCard, "id">) => void
  updateCreditCard: (id: string, card: Omit<CreditCard, "id">) => void
  updateRecommendation: (id: string, status: Recommendation["status"]) => void
  deleteIncome: (id: string) => void
  deleteAsset: (id: string) => void
  deleteLiability: (id: string) => void
  deleteCreditCard: (id: string) => void
}

const FinancialContext = createContext<FinancialContextType | undefined>(undefined)

const STORAGE_KEY = "wealth-management-data"

const initialData: FinancialData = {
  income: [],
  assets: [],
  liabilities: [],
  creditCards: [],
  recommendations: [
    {
      id: "1",
      title: "Build Emergency Fund",
      description: "Aim to save 3-6 months of expenses in a liquid savings account for unexpected situations.",
      category: "savings",
      status: "pending",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Diversify Investments",
      description: "Consider spreading your investments across different asset classes to reduce risk.",
      category: "investment",
      status: "pending",
      createdAt: new Date().toISOString(),
    },
    {
      id: "3",
      title: "Pay Down High-Interest Debt",
      description: "Focus on paying off credit cards and loans with interest rates above 10% first.",
      category: "debt",
      status: "pending",
      createdAt: new Date().toISOString(),
    },
  ],
}

export function FinancialProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<FinancialData>(initialData)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      setData(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  const addIncome = (income: Omit<Income, "id">) => {
    setData((prev) => {
      const newData = {
        ...prev,
        income: [...prev.income, { ...income, id: crypto.randomUUID() }],
      }
      const newRecommendations = generateRecommendations(newData)
      const recommendationsToAdd = newRecommendations
        .filter(
          (rec) =>
            !prev.recommendations.some((existing) => existing.title === rec.title && existing.status !== "dismissed"),
        )
        .map((rec) => ({
          ...rec,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        }))

      return {
        ...newData,
        recommendations: [...prev.recommendations, ...recommendationsToAdd],
      }
    })
  }

  const updateIncome = (id: string, income: Omit<Income, "id">) => {
    setData((prev) => ({
      ...prev,
      income: prev.income.map((item) => (item.id === id ? { ...item, ...income } : item)),
    }))
  }

  const addAsset = (asset: Omit<Asset, "id">) => {
    setData((prev) => {
      const newData = {
        ...prev,
        assets: [...prev.assets, { ...asset, id: crypto.randomUUID() }],
      }
      const newRecommendations = generateRecommendations(newData)
      const recommendationsToAdd = newRecommendations
        .filter(
          (rec) =>
            !prev.recommendations.some((existing) => existing.title === rec.title && existing.status !== "dismissed"),
        )
        .map((rec) => ({
          ...rec,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        }))

      return {
        ...newData,
        recommendations: [...prev.recommendations, ...recommendationsToAdd],
      }
    })
  }

  const updateAsset = (id: string, asset: Omit<Asset, "id">) => {
    setData((prev) => ({
      ...prev,
      assets: prev.assets.map((item) => (item.id === id ? { ...item, ...asset } : item)),
    }))
  }

  const addLiability = (liability: Omit<Liability, "id">) => {
    setData((prev) => {
      const newData = {
        ...prev,
        liabilities: [...prev.liabilities, { ...liability, id: crypto.randomUUID() }],
      }
      const newRecommendations = generateRecommendations(newData)
      const recommendationsToAdd = newRecommendations
        .filter(
          (rec) =>
            !prev.recommendations.some((existing) => existing.title === rec.title && existing.status !== "dismissed"),
        )
        .map((rec) => ({
          ...rec,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        }))

      return {
        ...newData,
        recommendations: [...prev.recommendations, ...recommendationsToAdd],
      }
    })
  }

  const updateLiability = (id: string, liability: Omit<Liability, "id">) => {
    setData((prev) => ({
      ...prev,
      liabilities: prev.liabilities.map((item) => (item.id === id ? { ...item, ...liability } : item)),
    }))
  }

  const addCreditCard = (card: Omit<CreditCard, "id">) => {
    setData((prev) => {
      const newData = {
        ...prev,
        creditCards: [...prev.creditCards, { ...card, id: crypto.randomUUID() }],
      }
      const newRecommendations = generateRecommendations(newData)
      const recommendationsToAdd = newRecommendations
        .filter(
          (rec) =>
            !prev.recommendations.some((existing) => existing.title === rec.title && existing.status !== "dismissed"),
        )
        .map((rec) => ({
          ...rec,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        }))

      return {
        ...newData,
        recommendations: [...prev.recommendations, ...recommendationsToAdd],
      }
    })
  }

  const updateCreditCard = (id: string, card: Omit<CreditCard, "id">) => {
    setData((prev) => ({
      ...prev,
      creditCards: prev.creditCards.map((item) => (item.id === id ? { ...item, ...card } : item)),
    }))
  }

  const updateRecommendation = (id: string, status: Recommendation["status"]) => {
    setData((prev) => ({
      ...prev,
      recommendations: prev.recommendations.map((rec) => (rec.id === id ? { ...rec, status } : rec)),
    }))
  }

  const deleteIncome = (id: string) => {
    setData((prev) => ({
      ...prev,
      income: prev.income.filter((item) => item.id !== id),
    }))
  }

  const deleteAsset = (id: string) => {
    setData((prev) => ({
      ...prev,
      assets: prev.assets.filter((item) => item.id !== id),
    }))
  }

  const deleteLiability = (id: string) => {
    setData((prev) => ({
      ...prev,
      liabilities: prev.liabilities.filter((item) => item.id !== id),
    }))
  }

  const deleteCreditCard = (id: string) => {
    setData((prev) => ({
      ...prev,
      creditCards: prev.creditCards.filter((item) => item.id !== id),
    }))
  }

  return (
    <FinancialContext.Provider
      value={{
        data,
        addIncome,
        updateIncome,
        addAsset,
        updateAsset,
        addLiability,
        updateLiability,
        addCreditCard,
        updateCreditCard,
        updateRecommendation,
        deleteIncome,
        deleteAsset,
        deleteLiability,
        deleteCreditCard,
      }}
    >
      {children}
    </FinancialContext.Provider>
  )
}

export function useFinancial() {
  const context = useContext(FinancialContext)
  if (!context) {
    throw new Error("useFinancial must be used within FinancialProvider")
  }
  return context
}
