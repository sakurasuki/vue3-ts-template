import { defineComponent, ref, PropType } from 'vue'
import { Button } from 'vant'
interface Test {
  name: string
  id: number
}
/**tsx写法示例 */
export default defineComponent({
  props: {
    test: {
      type: Object as PropType<Test>,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  emits: ['click'],
  setup(props, { emit, slots }) {
    const list = ref([1, 2, 3])
    const renderTitle = (str: string) => <div>{str}</div>
    const renderFooter = () => {
      return <div class="class">脚部</div>
    }
    //<></>默认容器 类似template 不会渲染真实dom
    return () => (
      <>
        <div class="jsx-demo">
          <div>jsx示例写法</div>
          {renderTitle('函数执行')}
          <Button
            onClick={() => emit('click')}
            v-slots={{
              default: () => slots.default?.() || 'jsx默认插槽写法'
            }}
          />
          <Button>{slots.default?.() || '插槽'}</Button>
          {/* 列表渲染 */}
          {list.value.map(v => (
            <div>{v}</div>
          ))}
          {/* 不能在这里使用if else 采用三元表达式，复杂场景用函数 */}
          {true ? <div>true</div> : <div>false</div>}
          {renderFooter()}
        </div>
      </>
    )
  }
})
