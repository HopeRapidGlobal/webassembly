(module
 (type $i32_i32_=>_i32 (func (param i32 i32) (result i32)))
 (type $i32_=>_i64 (func (param i32) (result i64)))
 (memory $0 0)
 (export "add" (func $assembly/index/add))
 (export "fibonacciWasm" (func $assembly/index/fibonacciWasm))
 (export "memory" (memory $0))
 (func $assembly/index/add (param $0 i32) (param $1 i32) (result i32)
  local.get $0
  local.get $1
  i32.add
 )
 (func $assembly/index/fibonacciWasm (param $0 i32) (result i64)
  local.get $0
  i32.const 0
  i32.lt_s
  if
   i64.const 0
   return
  end
  local.get $0
  i32.const 2
  i32.le_s
  if
   i64.const 1
   return
  end
  local.get $0
  i32.const 1
  i32.sub
  call $assembly/index/fibonacciWasm
  local.get $0
  i32.const 2
  i32.sub
  call $assembly/index/fibonacciWasm
  i64.add
 )
)
