"use client"

import { useEffect, useState } from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"

import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDownIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ReactFormState } from "react-dom/client"

export type Payment = {
  sno: number
  project: string
  description: string
  estimationHours: number
  status: "Yet to start" | "inprogress" | "completed"
}


export const columns: ColumnDef<Payment>[] = [

  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },


  {
    accessorKey: "sno",
    header: "S.No",
    cell: ({ row }) => (
      <div className="px-2 font-medium">{row.getValue("sno")}</div>
    ),
  },

  {
    accessorKey: "project",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="flex items-center gap-2"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
      >
        Project
        <ArrowUpDown className="h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize px-2">{row.getValue("project")}</div>
    ),
  },

  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="px-2 truncate max-w-[250px]">
        {row.getValue("description")}
      </div>
    ),
  },


  {
    accessorKey: "estimationHours",
    header: "Estimation Hours",
    cell: ({ row }) => (
      <div className="px-2">{row.getValue("estimationHours")}</div>
    ),
  },


  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize px-2">{row.getValue("status")}</div>
    ),
  },


]

export default function Page() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [loginEmail,setLoginEmail]=useState<string>('')
   const [tableData, setTableData] = useState<Payment[]>([]) 
  const [formData, setFormData] = useState({
    date: "",
    todate: "",
    project: "",
    status: "",
  })
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [open1, setOpen1] = useState(false)
  const [todate, setToDate] = useState<Date | undefined>(undefined)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name === 'project') {
      setFormData((prev) => ({ ...prev, project: value }))
    }
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === 'date') {
      setFormData((prev) => ({ ...prev, date: value }))
      console.log(formData.date)
    }
    if (name === 'todate')
      setFormData((prev) => ({ ...prev, todate: value }))
    console.log(formData.todate)

  }

  const handleFilterCard = async (e: React.FormEvent) => {
    e.preventDefault()
  }

  const table = useReactTable({
    data:tableData,
    columns,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })


  //fetch data

useEffect(()=>{
setLoginEmail(localStorage.getItem('userEmail')|| '')
console.log(loginEmail)
},[])
  
console.log(loginEmail)

   const handleProductData = async () => {
    try {
      const res = await fetch(`http://localhost:3001/user?email=${loginEmail}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!res.ok) throw new Error("Failed to fetch user data")

      const data = await res.json()
      console.log('Fetched data:', data)

      if (data.length !== 0) {
        const user = data[0]
        const projects = user.projects || []


        const formattedData: Payment[] = projects.map((p: any, index: number) => ({
          sno: index + 1,
          project: p.projectName,
          description: p.projectDescription,
          estimationHours: p.projectHours,
          status: p.projectStatus,
        }))

        setTableData(formattedData)
      } else {
        setTableData([]) 
      }

    } catch (error: any) {
      console.error("Error:", error.message)
      setTableData([])
    } 
  }

  useEffect(() => {
    handleProductData()
  }, [])

  return (
    //  <div className=" bg-background flex justify-center">
    <div className=" bg-background justify-center">

      <div className="w-full space-y-6">
        {/* Filter Card */}
        <h1 className="text-xl font-bold tracking-tight mr-4">Filter Card</h1>

        <Card>
          <CardContent>
            <form onSubmit={handleFilterCard}>

              <FieldGroup>

                <Field>
                  <Field className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    {/* From Date Field */}
                   <div className="flex flex-col gap-3 w-full">
                      <FieldLabel htmlFor="toDate">Date</FieldLabel>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            id="date"
                            className="w-full justify-between font-normal"
                          >
                            {date ? date.toLocaleDateString() : "Select date"}
                            <ChevronDownIcon />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            captionLayout="dropdown"
                            onSelect={(date) => {
                              setDate(date);
                              setOpen(false);
                              console.log("To Date:", date);
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                        

                    {/* To Date Field */}
                    <div className="flex flex-col gap-3 w-full">
                      <FieldLabel htmlFor="toDate">To Date</FieldLabel>
                      <Popover open={open1} onOpenChange={setOpen1}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            id="toDate"
                            className="w-full justify-between font-normal"
                          >
                            {todate ? todate.toLocaleDateString() : "Select date"}
                            <ChevronDownIcon />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={todate}
                            captionLayout="dropdown"
                            onSelect={(todate) => {
                              setToDate(todate);
                              setOpen1(false);
                              console.log("To Date:", todate);
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Project Selection */}
                    <div className="flex flex-col gap-3 w-full">
                      <FieldLabel htmlFor="project">Project</FieldLabel>
                      <Select
                        value={formData.project}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, project: value }))
                        }
                      >
                        <SelectTrigger className="w-full cursor-pointer">
                          <SelectValue placeholder="Select a Project" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Projects</SelectLabel>
                            <SelectItem value="realworld">Realworld</SelectItem>
                            <SelectItem value="giftbottle">GiftBottle</SelectItem>
                            <SelectItem value="aoc">AOC</SelectItem>
                            <SelectItem value="forms">Forms</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                  </Field>




                  <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6">
                    {/* Status */}
                    <div className="w-full  md:w-1/4 ">
                      <FieldLabel htmlFor="status" className="mb-2">Status</FieldLabel>
                      <Select
                        value={formData.status}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, status: value }))
                        }
                      >
                        <SelectTrigger className="w-full cursor-pointer">
                          <SelectValue placeholder="Select a Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            <SelectItem value="complete">Complete</SelectItem>
                            <SelectItem value="inprogress">In Progress</SelectItem>
                            <SelectItem value="yet to start">Yet to Start</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Apply Button */}
                    <Button
                      type="submit"
                      disabled={
                        !date || !todate || !formData.project || !formData.status
                      }
                      className="w-full md:w-1/4 cursor-pointer mt-6"
                    >
                      Apply
                    </Button>
                  </div>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>




        {/* Table Section */}


        <h1 className="text-xl font-bold tracking-tight text-center">All Worksheet Data</h1>
        <div className="w-full">
          <div className="flex items-center py-4">
            <Input
              placeholder="Filter project..."
              value={(table.getColumn("project")?.getFilterValue() as string) ?? ""}
              onChange={(event) => table.getColumn("project")?.setFilterValue(event.target.value)}
              className="max-w-sm"
            />

          </div>

          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="text-muted-foreground flex-1 text-sm">
              {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
           {/* <div className="space-x-2">
              <Button variant="outline"
                className="cursor-pointer" size="sm" onClick={() =>
                 table.previousPage()
                
                 } disabled={!table.getCanPreviousPage()}>
              
              1
              </Button>
              <Button variant="outline" size="sm" className="cursor-pointer" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                2
              </Button>
            </div>  */}

<div className="space-x-2 flex items-center">
  {Array.from({ length: table.getPageCount() }, (_, i) => i)
    .filter(i => {
      const current = table.getState().pagination.pageIndex;
      return i >= current - 1 && i <= current + 1;
    })
    .map(i => (
      <Button
        key={i}
        variant={table.getState().pagination.pageIndex === i ? "default" : "outline"}
        size="sm"
        className="cursor-pointer"
        onClick={() => table.setPageIndex(i)}
      >
        {i + 1}
      </Button>
    ))}
</div>




          </div>

        </div>


      </div>
    </div>


  )
} 
