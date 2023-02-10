import { useState } from "react";
import { 
  Dimensions, 
  ScrollView, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View 
} from "react-native";

import { Feather } from '@expo/vector-icons';
import colors from "tailwindcss/colors";

import { CheckBox } from "../components/Buttons/CheckBox";
import { ReturnButton } from "../components/Buttons/ReturnButton";

const SCREEN_HORIZONTAL_PADDING = Math.round((Dimensions.get('screen').width) / ((32 * 2) / 5) + 1);
const SCREEN_VERTICAL_PADDING = Math.round((Dimensions.get('screen').height) / ((32 * 5) / 12) + 2);

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
        bg-background"  
        style={{ paddingHorizontal: SCREEN_HORIZONTAL_PADDING, paddingVertical: SCREEN_VERTICAL_PADDING }}
    >
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >

        <ReturnButton />

        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar Hábitos
        </Text>

        <Text className="mt-6 text-white font-semibold text-base">
          Qual seu comprometimento?
        </Text>

        <TextInput 
          className="
          h-12
          pl-4
          rounded-lg 
          mt-3
          text-white
          bg-zinc-900
          border-2
          border-zinc-800
          focus:border-green-500"
          placeholder="Exercícios, dormir bem, etc..."
          placeholderTextColor={colors.zinc[400]}          
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