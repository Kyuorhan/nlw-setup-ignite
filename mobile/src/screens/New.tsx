import { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import colors from "tailwindcss/colors";

import { CheckBox } from "../components/Buttons/CheckBox";
import { ReturnButton } from "../components/Buttons/ReturnButton";

const avaiableWeekDays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado'
]

export function New() {
  const [weekDays, setWeekDays] = useState<number[]>([]);

  function handleToggleWeekDay(weekDayIndex: number) {
    if(weekDays.includes(weekDayIndex)) {
      setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))
    } else {
      setWeekDays(prevState => [...prevState, weekDayIndex]);
    }

  }

  return (
    <View 
      className="
        flex-1 
        bg-background
        px-8 pt-16"        
    >
      <ScrollView showsVerticalScrollIndicator={false}>

        <ReturnButton />

        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar Hábitos
        </Text>

        <Text className="mt-6 text-white font-semibold text-base">
          Qual seu comprometimento?
        </Text>

        <TextInput 
          // placeholder="Exercícios, dormir bem, etc..."
          className="
            h-12
            pl-4
            rounded-lg 
            mt-3
            text-white
            bg-zinc-900
            border-2
            border-zinc-800
            focus:border-2
            focus:border-green-400"
        />

        <Text className="mt-4 mb-3 text-white font-semibold text-base">
          Qual a recorrência?
        </Text>
          
        {
          avaiableWeekDays.map((weekDay, index) => (
            <CheckBox 
              key={weekDay}
              title={weekDay}
              checked={weekDays.includes(index)}
              onPress={() => handleToggleWeekDay(index)}
            />
          ))
        }
        
        <TouchableOpacity
          activeOpacity={0.7}
          className="
            w-full
            h-14
            flex-row
            items-center
            justify-center
            bg-green-500
            rounded-lg
            mt-6"
        >
          <Feather 
            name="check"
            size={20}
            color={colors.white}
          />

          <Text className="font-semibold text-base text-white ml-2">
            Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}