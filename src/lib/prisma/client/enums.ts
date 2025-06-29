
/* !!! This is code generated by Prisma. Do not edit directly. !!! */
/* eslint-disable */
// @ts-nocheck 
/**
* This file exports all enum related types from the schema.
*
* 🟢 You can import this file directly.
*/
export const ChoiceType = {
  GENRE: 'GENRE',
  ARTIST: 'ARTIST',
  SONG: 'SONG',
  ALBUM: 'ALBUM'
} as const

export type ChoiceType = (typeof ChoiceType)[keyof typeof ChoiceType]


export const AffinityType = {
  LAWFUL: 'LAWFUL',
  EVIL: 'EVIL',
  BALANCED: 'BALANCED',
  GOOD: 'GOOD',
  CHAOTIC: 'CHAOTIC',
  NEUTRAL: 'NEUTRAL',
  MELANCHOLIC: 'MELANCHOLIC',
  FRAGILE: 'FRAGILE',
  TRANSCENDENT: 'TRANSCENDENT',
  ETHEREAL: 'ETHEREAL',
  PASSIONATE: 'PASSIONATE',
  INTROSPECTIVE: 'INTROSPECTIVE',
  MINIMALISTIC: 'MINIMALISTIC',
  SOULFUL: 'SOULFUL',
  DYNAMIC: 'DYNAMIC',
  HAUNTING: 'HAUNTING',
  POETIC: 'POETIC'
} as const

export type AffinityType = (typeof AffinityType)[keyof typeof AffinityType]
