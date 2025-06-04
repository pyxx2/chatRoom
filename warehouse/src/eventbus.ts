import mitt from 'mitt';

type Events = {
  formUpdate: Record<string, any>; // 你可以根据需要定义更具体的类型
};

const emitter = mitt<Events>();

export default emitter;