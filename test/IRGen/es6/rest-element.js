// RUN: %hermesc -dump-ir %s | %FileCheck --match-full-lines %s

function f1(t) {
    var [...a] = t;
}
//CHECK-LABEL: function f1(t)
//CHECK-NEXT: frame = [a, t]
//CHECK-NEXT: %BB0:
//CHECK-NEXT:   %0 = StoreFrameInst undefined : undefined, [a]
//CHECK-NEXT:   %1 = StoreFrameInst %t, [t]
//CHECK-NEXT:   %2 = LoadFrameInst [t]
//CHECK-NEXT:   %3 = TryLoadGlobalPropertyInst globalObject : object, "Symbol" : string
//CHECK-NEXT:   %4 = LoadPropertyInst %3, "iterator" : string
//CHECK-NEXT:   %5 = LoadPropertyInst %2, %4
//CHECK-NEXT:   %6 = CallInst %5, %2
//CHECK-NEXT:   %7 = TryLoadGlobalPropertyInst globalObject : object, "HermesInternal" : string
//CHECK-NEXT:   %8 = LoadPropertyInst %7, "ensureObject" : string
//CHECK-NEXT:   %9 = CallInst %8, undefined : undefined, %6, "iterator is not an object" : string
//CHECK-NEXT:   %10 = LoadPropertyInst %6, "next" : string
//CHECK-NEXT:   %11 = AllocStackInst $?anon_0_iterDone
//CHECK-NEXT:   %12 = StoreStackInst undefined : undefined, %11
//CHECK-NEXT:   %13 = AllocStackInst $?anon_1_iterValue
//CHECK-NEXT:   %14 = AllocArrayInst 0 : number
//CHECK-NEXT:   %15 = AllocStackInst $?anon_2_n
//CHECK-NEXT:   %16 = StoreStackInst 0 : number, %15
//CHECK-NEXT:   %17 = LoadStackInst %11
//CHECK-NEXT:   %18 = CondBranchInst %17, %BB1, %BB2
//CHECK-NEXT: %BB2:
//CHECK-NEXT:   %19 = CallInst %10, %6
//CHECK-NEXT:   %20 = TryLoadGlobalPropertyInst globalObject : object, "HermesInternal" : string
//CHECK-NEXT:   %21 = LoadPropertyInst %20, "ensureObject" : string
//CHECK-NEXT:   %22 = CallInst %21, undefined : undefined, %19, "iterator.next() did not return an object" : string
//CHECK-NEXT:   %23 = LoadPropertyInst %19, "done" : string
//CHECK-NEXT:   %24 = StoreStackInst %23, %11
//CHECK-NEXT:   %25 = CondBranchInst %23, %BB1, %BB3
//CHECK-NEXT: %BB3:
//CHECK-NEXT:   %26 = LoadPropertyInst %19, "value" : string
//CHECK-NEXT:   %27 = LoadStackInst %15
//CHECK-NEXT:   %28 = StorePropertyInst %26, %14 : object, %27 : number
//CHECK-NEXT:   %29 = BinaryOperatorInst '+', %27 : number, 1 : number
//CHECK-NEXT:   %30 = StoreStackInst %29 : number, %15
//CHECK-NEXT:   %31 = BranchInst %BB2
//CHECK-NEXT: %BB1:
//CHECK-NEXT:   %32 = StoreFrameInst %14 : object, [a]
//CHECK-NEXT:   %33 = ReturnInst undefined : undefined
//CHECK-NEXT: function_end

function f2(t) {
    var [...[b, c]] = t;
}
//CHECK-LABEL: function f2(t)
//CHECK-NEXT: frame = [b, c, t]
//CHECK-NEXT: %BB0:
//CHECK-NEXT:   %0 = StoreFrameInst undefined : undefined, [b]
//CHECK-NEXT:   %1 = StoreFrameInst undefined : undefined, [c]
//CHECK-NEXT:   %2 = StoreFrameInst %t, [t]
//CHECK-NEXT:   %3 = LoadFrameInst [t]
//CHECK-NEXT:   %4 = TryLoadGlobalPropertyInst globalObject : object, "Symbol" : string
//CHECK-NEXT:   %5 = LoadPropertyInst %4, "iterator" : string
//CHECK-NEXT:   %6 = LoadPropertyInst %3, %5
//CHECK-NEXT:   %7 = CallInst %6, %3
//CHECK-NEXT:   %8 = TryLoadGlobalPropertyInst globalObject : object, "HermesInternal" : string
//CHECK-NEXT:   %9 = LoadPropertyInst %8, "ensureObject" : string
//CHECK-NEXT:   %10 = CallInst %9, undefined : undefined, %7, "iterator is not an object" : string
//CHECK-NEXT:   %11 = LoadPropertyInst %7, "next" : string
//CHECK-NEXT:   %12 = AllocStackInst $?anon_0_iterDone
//CHECK-NEXT:   %13 = StoreStackInst undefined : undefined, %12
//CHECK-NEXT:   %14 = AllocStackInst $?anon_1_iterValue
//CHECK-NEXT:   %15 = StoreStackInst undefined : undefined, %14
//CHECK-NEXT:   %16 = BranchInst %BB1
//CHECK-NEXT: %BB1:
//CHECK-NEXT:   %17 = CallInst %11, %7
//CHECK-NEXT:   %18 = TryLoadGlobalPropertyInst globalObject : object, "HermesInternal" : string
//CHECK-NEXT:   %19 = LoadPropertyInst %18, "ensureObject" : string
//CHECK-NEXT:   %20 = CallInst %19, undefined : undefined, %17, "iterator.next() did not return an object" : string
//CHECK-NEXT:   %21 = LoadPropertyInst %17, "done" : string
//CHECK-NEXT:   %22 = StoreStackInst %21, %12
//CHECK-NEXT:   %23 = CondBranchInst %21, %BB2, %BB3
//CHECK-NEXT: %BB3:
//CHECK-NEXT:   %24 = LoadPropertyInst %17, "value" : string
//CHECK-NEXT:   %25 = StoreStackInst %24, %14
//CHECK-NEXT:   %26 = BranchInst %BB2
//CHECK-NEXT: %BB2:
//CHECK-NEXT:   %27 = LoadStackInst %14
//CHECK-NEXT:   %28 = StoreFrameInst %27, [b]
//CHECK-NEXT:   %29 = StoreStackInst undefined : undefined, %14
//CHECK-NEXT:   %30 = LoadStackInst %12
//CHECK-NEXT:   %31 = CondBranchInst %30, %BB4, %BB5
//CHECK-NEXT: %BB5:
//CHECK-NEXT:   %32 = CallInst %11, %7
//CHECK-NEXT:   %33 = TryLoadGlobalPropertyInst globalObject : object, "HermesInternal" : string
//CHECK-NEXT:   %34 = LoadPropertyInst %33, "ensureObject" : string
//CHECK-NEXT:   %35 = CallInst %34, undefined : undefined, %32, "iterator.next() did not return an object" : string
//CHECK-NEXT:   %36 = LoadPropertyInst %32, "done" : string
//CHECK-NEXT:   %37 = StoreStackInst %36, %12
//CHECK-NEXT:   %38 = CondBranchInst %36, %BB4, %BB6
//CHECK-NEXT: %BB6:
//CHECK-NEXT:   %39 = LoadPropertyInst %32, "value" : string
//CHECK-NEXT:   %40 = StoreStackInst %39, %14
//CHECK-NEXT:   %41 = BranchInst %BB4
//CHECK-NEXT: %BB4:
//CHECK-NEXT:   %42 = LoadStackInst %14
//CHECK-NEXT:   %43 = StoreFrameInst %42, [c]
//CHECK-NEXT:   %44 = ReturnInst undefined : undefined
//CHECK-NEXT: function_end

function f3(t) {
    for(var[...d] in t);
}
//CHECK-LABEL: function f3(t)
//CHECK-NEXT: frame = [d, t]
//CHECK-NEXT: %BB0:
//CHECK-NEXT:   %0 = StoreFrameInst undefined : undefined, [d]
//CHECK-NEXT:   %1 = StoreFrameInst %t, [t]
//CHECK-NEXT:   %2 = AllocStackInst $?anon_0_iter
//CHECK-NEXT:   %3 = AllocStackInst $?anon_1_base
//CHECK-NEXT:   %4 = AllocStackInst $?anon_2_idx
//CHECK-NEXT:   %5 = AllocStackInst $?anon_3_size
//CHECK-NEXT:   %6 = LoadFrameInst [t]
//CHECK-NEXT:   %7 = StoreStackInst %6, %3
//CHECK-NEXT:   %8 = AllocStackInst $?anon_4_prop
//CHECK-NEXT:   %9 = GetPNamesInst %2, %3, %4, %5, %BB1, %BB2
//CHECK-NEXT: %BB1:
//CHECK-NEXT:   %10 = ReturnInst undefined : undefined
//CHECK-NEXT: %BB2:
//CHECK-NEXT:   %11 = GetNextPNameInst %8, %3, %4, %5, %2, %BB1, %BB3
//CHECK-NEXT: %BB3:
//CHECK-NEXT:   %12 = LoadStackInst %8
//CHECK-NEXT:   %13 = TryLoadGlobalPropertyInst globalObject : object, "Symbol" : string
//CHECK-NEXT:   %14 = LoadPropertyInst %13, "iterator" : string
//CHECK-NEXT:   %15 = LoadPropertyInst %12, %14
//CHECK-NEXT:   %16 = CallInst %15, %12
//CHECK-NEXT:   %17 = TryLoadGlobalPropertyInst globalObject : object, "HermesInternal" : string
//CHECK-NEXT:   %18 = LoadPropertyInst %17, "ensureObject" : string
//CHECK-NEXT:   %19 = CallInst %18, undefined : undefined, %16, "iterator is not an object" : string
//CHECK-NEXT:   %20 = LoadPropertyInst %16, "next" : string
//CHECK-NEXT:   %21 = AllocStackInst $?anon_5_iterDone
//CHECK-NEXT:   %22 = StoreStackInst undefined : undefined, %21
//CHECK-NEXT:   %23 = AllocStackInst $?anon_6_iterValue
//CHECK-NEXT:   %24 = AllocArrayInst 0 : number
//CHECK-NEXT:   %25 = AllocStackInst $?anon_7_n
//CHECK-NEXT:   %26 = StoreStackInst 0 : number, %25
//CHECK-NEXT:   %27 = LoadStackInst %21
//CHECK-NEXT:   %28 = CondBranchInst %27, %BB4, %BB5
//CHECK-NEXT: %BB5:
//CHECK-NEXT:   %29 = CallInst %20, %16
//CHECK-NEXT:   %30 = TryLoadGlobalPropertyInst globalObject : object, "HermesInternal" : string
//CHECK-NEXT:   %31 = LoadPropertyInst %30, "ensureObject" : string
//CHECK-NEXT:   %32 = CallInst %31, undefined : undefined, %29, "iterator.next() did not return an object" : string
//CHECK-NEXT:   %33 = LoadPropertyInst %29, "done" : string
//CHECK-NEXT:   %34 = StoreStackInst %33, %21
//CHECK-NEXT:   %35 = CondBranchInst %33, %BB4, %BB6
//CHECK-NEXT: %BB6:
//CHECK-NEXT:   %36 = LoadPropertyInst %29, "value" : string
//CHECK-NEXT:   %37 = LoadStackInst %25
//CHECK-NEXT:   %38 = StorePropertyInst %36, %24 : object, %37 : number
//CHECK-NEXT:   %39 = BinaryOperatorInst '+', %37 : number, 1 : number
//CHECK-NEXT:   %40 = StoreStackInst %39 : number, %25
//CHECK-NEXT:   %41 = BranchInst %BB5
//CHECK-NEXT: %BB4:
//CHECK-NEXT:   %42 = StoreFrameInst %24 : object, [d]
//CHECK-NEXT:   %43 = BranchInst %BB2
//CHECK-NEXT: function_end

function f4(t) {
    var a, b;
    [a, ...[b[0]]] = t;
}
//CHECK-LABEL: function f4(t)
//CHECK-NEXT: frame = [a, b, t]
//CHECK-NEXT: %BB0:
//CHECK-NEXT:   %0 = StoreFrameInst undefined : undefined, [a]
//CHECK-NEXT:   %1 = StoreFrameInst undefined : undefined, [b]
//CHECK-NEXT:   %2 = StoreFrameInst %t, [t]
//CHECK-NEXT:   %3 = LoadFrameInst [t]
//CHECK-NEXT:   %4 = TryLoadGlobalPropertyInst globalObject : object, "Symbol" : string
//CHECK-NEXT:   %5 = LoadPropertyInst %4, "iterator" : string
//CHECK-NEXT:   %6 = LoadPropertyInst %3, %5
//CHECK-NEXT:   %7 = CallInst %6, %3
//CHECK-NEXT:   %8 = TryLoadGlobalPropertyInst globalObject : object, "HermesInternal" : string
//CHECK-NEXT:   %9 = LoadPropertyInst %8, "ensureObject" : string
//CHECK-NEXT:   %10 = CallInst %9, undefined : undefined, %7, "iterator is not an object" : string
//CHECK-NEXT:   %11 = LoadPropertyInst %7, "next" : string
//CHECK-NEXT:   %12 = AllocStackInst $?anon_0_iterDone
//CHECK-NEXT:   %13 = StoreStackInst undefined : undefined, %12
//CHECK-NEXT:   %14 = AllocStackInst $?anon_1_iterValue
//CHECK-NEXT:   %15 = StoreStackInst undefined : undefined, %14
//CHECK-NEXT:   %16 = BranchInst %BB1
//CHECK-NEXT: %BB1:
//CHECK-NEXT:   %17 = CallInst %11, %7
//CHECK-NEXT:   %18 = TryLoadGlobalPropertyInst globalObject : object, "HermesInternal" : string
//CHECK-NEXT:   %19 = LoadPropertyInst %18, "ensureObject" : string
//CHECK-NEXT:   %20 = CallInst %19, undefined : undefined, %17, "iterator.next() did not return an object" : string
//CHECK-NEXT:   %21 = LoadPropertyInst %17, "done" : string
//CHECK-NEXT:   %22 = StoreStackInst %21, %12
//CHECK-NEXT:   %23 = CondBranchInst %21, %BB2, %BB3
//CHECK-NEXT: %BB3:
//CHECK-NEXT:   %24 = LoadPropertyInst %17, "value" : string
//CHECK-NEXT:   %25 = StoreStackInst %24, %14
//CHECK-NEXT:   %26 = BranchInst %BB2
//CHECK-NEXT: %BB2:
//CHECK-NEXT:   %27 = LoadStackInst %14
//CHECK-NEXT:   %28 = StoreFrameInst %27, [a]
//CHECK-NEXT:   %29 = LoadFrameInst [b]
//CHECK-NEXT:   %30 = StoreStackInst undefined : undefined, %14
//CHECK-NEXT:   %31 = LoadStackInst %12
//CHECK-NEXT:   %32 = CondBranchInst %31, %BB4, %BB5
//CHECK-NEXT: %BB5:
//CHECK-NEXT:   %33 = CallInst %11, %7
//CHECK-NEXT:   %34 = TryLoadGlobalPropertyInst globalObject : object, "HermesInternal" : string
//CHECK-NEXT:   %35 = LoadPropertyInst %34, "ensureObject" : string
//CHECK-NEXT:   %36 = CallInst %35, undefined : undefined, %33, "iterator.next() did not return an object" : string
//CHECK-NEXT:   %37 = LoadPropertyInst %33, "done" : string
//CHECK-NEXT:   %38 = StoreStackInst %37, %12
//CHECK-NEXT:   %39 = CondBranchInst %37, %BB4, %BB6
//CHECK-NEXT: %BB6:
//CHECK-NEXT:   %40 = LoadPropertyInst %33, "value" : string
//CHECK-NEXT:   %41 = StoreStackInst %40, %14
//CHECK-NEXT:   %42 = BranchInst %BB4
//CHECK-NEXT: %BB4:
//CHECK-NEXT:   %43 = LoadStackInst %14
//CHECK-NEXT:   %44 = StorePropertyInst %43, %29, 0 : number
//CHECK-NEXT:   %45 = ReturnInst undefined : undefined
//CHECK-NEXT: function_end
