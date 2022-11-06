import create from "zustand";

type State = {
  text: string;
  setText: (value: string) => void;
  speed: number;
  incrementSpeed: () => void;
  decrementSpeed: () => void;
};

export const useStore = create<State>((set, get) => ({
  text: "",
  setText: (value: string) => set({ text: value }),
  speed: 4,
  incrementSpeed: () => {
    const currentSpeed = get().speed;
    if (currentSpeed < 10) {
      set((state) => ({
        speed: state.speed + 1,
      }));
    }
  },
  decrementSpeed: () => {
    const currentSpeed = get().speed;
    if (currentSpeed > 1) {
      set((state) => ({
        speed: state.speed - 1,
      }));
    }
  },
}));
