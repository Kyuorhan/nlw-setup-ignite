import { ScrollView, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';

import { ReturnButton } from '../components/Buttons/ReturnButton';
import { parse } from 'react-native-svg';
import { ProgressBar } from '../components/ProgressBar';
import { CheckBox } from '../components/Buttons/CheckBox';

interface Params {
  date: string;
}

export function Habit() {
  const route =useRoute();
  const { date } = route.params as Params;

  const parsedDate = dayjs(date);
  const dayOfWeek = parsedDate.format('dddd'); // Extrair qual o dia da semana
  const dayAndMont = parsedDate.format('DD/MM'); // Extrair o dia/mes

  return (
    <View 
      className="
        flex-1 
        bg-background
        px-8 pt-16"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100}}
      >

      <ReturnButton />

      <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
        {dayOfWeek}
      </Text>

      <Text className="text-white font-extrabold text-3xl">
        {dayAndMont}
      </Text>

      <ProgressBar progress={30}/>

      <View 
        className="
          mt-6"
      >
        <CheckBox 
          title="Beber 2L de água"
          checked={false}
        />

        <CheckBox 
          title="Exercício"
          checked={true}
        />
      </View>

      </ScrollView>        
    </View>
  )
}