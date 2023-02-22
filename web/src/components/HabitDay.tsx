import * as Popover from '@radix-ui/react-popover';
import * as CheckBox from '@radix-ui/react-checkbox';
import clsx from 'clsx';

import { ProressBars } from './ProgressBars';
import { Check } from 'phosphor-react';

interface HabitDayProps {
  completed: number
  amount: number
}


export function HabitDay({ completed, amount }: HabitDayProps) {
  const completedPercentage = Math.round((completed / amount) * 100)

    return(      
      <Popover.Root>
        <Popover.Trigger 
          className={
            clsx("w-10 h-10 border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background", {
              'bg-zinc-900 border-zinc-800': completedPercentage === 0,
              'bg-violet-900 border-violet-500': completedPercentage > 0 && completedPercentage < 20,
              'bg-violet-800 border-violet-500': completedPercentage >= 20 && completedPercentage < 40,
              'bg-violet-700 border-violet-500': completedPercentage >= 40 && completedPercentage < 60,
              'bg-violet-600 border-violet-500': completedPercentage >= 60 && completedPercentage < 80,
              'bg-violet-500 border-violet-400': completedPercentage >= 80,
            })} 
        />

        <Popover.Portal>
          <Popover.Content
            className="
              min-w-[320px]
              p-6
              rounded-2xl
              bg-zinc-900
              flex
              flex-col"
          >
            <span className="font-semibold text-zinc-400">Terça-feira</span>
            <span className="mt-1 font-extrabold leading-tigh text-3xl">17/01</span>

            <ProressBars progress={completedPercentage} />

            <div className="mt-6 flex flex-col gap-3">
              <CheckBox.Root
                className="
                  flex
                  items-center
                  gap-3
                  group
                  focus:outline-none"
              >
                <div 
                  className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 
                  group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500"
                >
                  <CheckBox.Indicator>
                    <Check 
                      size={20}
                      className="text-white"
                    />
                  </CheckBox.Indicator>
                </div>
              
                <span className="font-semibold text-xl text-white leading-tight
                  group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400"
                >       
                  Beber 2L de água          
                </span>
              </CheckBox.Root>
              <CheckBox.Root
                className="
                  flex
                  items-center
                  gap-3
                  group
                  focus:outline-none"                  
              >
                <div 
                  className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 
                  group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500"
                >
                  <CheckBox.Indicator>
                    <Check 
                      size={20}
                      className="text-white"
                    />
                  </CheckBox.Indicator>
                </div>
              
                <span className="font-semibold text-xl text-white leading-tight
                  group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400"
                >       
                  Exercício       
                </span>
              </CheckBox.Root>
              <CheckBox.Root
                className="
                  flex
                  items-center
                  gap-3
                  group
                  focus:outline-none"                  
              >
                <div 
                  className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 
                  group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500"
                >
                  <CheckBox.Indicator>
                    <Check 
                      size={20}
                      className="text-white"
                    />
                  </CheckBox.Indicator>
                </div>
              
                <span className="font-semibold text-xl text-white leading-tight
                  group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400"
                >       
                  Alimentação saudável          
                </span>
              </CheckBox.Root>
            </div>

            


            <Popover.Arrow 
              height={8}
              width={16}
              className="
                fill-zinc-600 
                mt-1 mb-1"
            />          
          </Popover.Content>
        </Popover.Portal>
        
      </Popover.Root>
    )
}