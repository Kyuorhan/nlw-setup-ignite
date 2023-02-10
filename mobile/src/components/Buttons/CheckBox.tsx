import { Dimensions, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';

const CHECKBOX_SIZE = Math.round((Dimensions.get('screen').width) / ((32 * 2) / 5) + 1);
const CHECKBOX_MARGIN = Math.round(Dimensions.get('screen').height / 100)

interface Props extends TouchableOpacityProps {
  title: string;
  checked?: boolean;
}

export function CheckBox({ title, checked = false, ...rest }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      className="
        flex-row           
        items-center"
        style={{ marginBottom: CHECKBOX_MARGIN }}
      {...rest}      
    >
     {  
        checked
          ?    
          <View
            className="                    
              bg-green-500
              rounded-lg
              items-center
              justify-center"
              style={{ width: CHECKBOX_SIZE, height: CHECKBOX_SIZE }}              
          >
            <Feather 
              name="check"
              size={20}
              color={colors.white}          
            />
          </View>
          :
          <View 
            className="
              bg-zinc-900
              rounded-lg
              border-2
              border-zinc-800" 
              style={{ width: CHECKBOX_SIZE, height: CHECKBOX_SIZE }}             
          />
      }

      <Text className="text-white text-base ml-3 font-semibold">
        {title}
      </Text>

    </TouchableOpacity>
  );
}