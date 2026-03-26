import { cn } from "@/lib/utils";
import PartiallyControlledInput from "./StatInput";
import { InputName } from "@/statInputHelpers";
import { InputColor } from "@/colorHelpers";
import StatToolTip from "./StatToolTip";
import { useState } from "react";

export default function BarInput({
  parentValue,
  parentMax,
  color,
  valueUpdateHandler,
  maxUpdateHandler,
  valueName,
  maxName,
  animateOnlyWhenRootActive = false,
  isGM = true, // <-- НОВОЕ: передаём isGM
}: {
  parentValue: number;
  parentMax: number;
  color: InputColor;
  valueUpdateHandler: (target: HTMLInputElement) => Promise<void>;
  maxUpdateHandler: (target: HTMLInputElement) => Promise<void>;
  valueName: InputName;
  maxName: InputName;
  animateOnlyWhenRootActive?: boolean;
  isGM?: boolean; // <-- НОВОЕ: если false, игроки видят только текст
}): JSX.Element {
  const [valueHasFocus, setValueHasFocus] = useState(false);
  const [maxHasFocus, setMaxHasFocus] = useState(false);

  const animationDuration75 = animateOnlyWhenRootActive
    ? "group-focus-within/root:duration-75 group-hover/root:duration-75"
    : "duration-75";

  return (
    <div
      className={`grid grid-cols-1 grid-rows-1 place-items-center drop-shadow-sm focus-within:bg-transparent focus-within:drop-shadow-md`}
    >
      <div
        className={cn(
          animationDuration75,
          "peer col-span-full row-span-full flex h-[44px] w-[100px] justify-between rounded-xl pb-[2px] outline-0 dark:outline dark:outline-2 dark:-outline-offset-2 dark:outline-white/40",
          {
            "bg-stat-red/10 fill-stat-red/25 dark:bg-stat-red-dark/10 dark:fill-stat-red-dark/20 dark:focus-within:outline-stat-red-highlight-dark":
              color === "RED",
          },
        )}
      >
        <div className={"pointer-events-none absolute -z-30"}>
          {valueHasFocus && <LeftCutoutBackground />}
          {maxHasFocus && <RightCutoutBackground />}
          {!valueHasFocus && !maxHasFocus && (
            <div
              className={cn("h-[44px] w-[100px] rounded-xl", {
                "bg-stat-red/25 dark:bg-stat-red-dark/20": color === "RED",
              })}
            ></div>
          )}
        </div>
        
        {/* ТЕКУЩИЙ ХП */}
        <StatToolTip
          open={valueHasFocus && parentValue !== 0}
          text={parentValue.toString()}
          color={color}
        >
          {isGM ? (
            <PartiallyControlledInput
              parentValue={parentValue.toString()}
              name={valueName}
              onUserConfirm={valueUpdateHandler}
              onFocus={() => setValueHasFocus(true)}
              onBlur={() => setValueHasFocus(false)}
              className={cn(
                "size-[44px] rounded-xl bg-transparent text-center font-normal text-text-primary outline-none dark:text-text-primary-dark",
              )}
            />
          ) : (
            <span
              className="size-[44px] rounded-xl bg-transparent text-center font-normal text-text-primary outline-none dark:text-text-primary-dark flex items-center justify-center cursor-default"
            >
              {parentValue}
            </span>
          )}
        </StatToolTip>
        
        <div
          className={cn(
            "flex h-full items-center justify-center pt-[2px] text-text-primary dark:text-text-primary-dark",
          )}
        >
          /
        </div>
        
        {/* МАКСИМАЛЬНЫЙ ХП */}
        <StatToolTip
          open={maxHasFocus && parentMax !== 0}
          text={parentMax.toString()}
          color={color}
        >
          {isGM ? (
            <PartiallyControlledInput
              parentValue={parentMax.toString()}
              name={maxName}
              onUserConfirm={maxUpdateHandler}
              onFocus={() => setMaxHasFocus(true)}
              onBlur={() => setMaxHasFocus(false)}
              className={cn(
                "size-[44px] rounded-xl bg-transparent text-center font-normal text-text-primary outline-none dark:text-text-primary-dark",
              )}
            />
          ) : (
            <span
              className="size-[44px] rounded-xl bg-transparent text-center font-normal text-text-primary outline-none dark:text-text-primary-dark flex items-center justify-center cursor-default"
            >
              {parentMax}
            </span>
          )}
        </StatToolTip>
      </div>
    </div>
  );
}

// Оставь эти функции как есть
function LeftCutoutBackground() { /* ... */ }
function RightCutoutBackground() { /* ... */ }
