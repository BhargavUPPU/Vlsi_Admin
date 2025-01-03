"use client";

import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/components/ui/table";
import { Badge } from "../../components/components/ui/badge";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../components/components/ui/alert";
import { Terminal } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

const chartData = [
  { month: "January", desktop: 186, tablet: 30, mobile: 80 },
  { month: "February", desktop: 305, tablet: 50, mobile: 200 },
  { month: "March", desktop: 237, tablet: 53, mobile: 120 },
  { month: "April", desktop: 73, tablet: 67, mobile: 190 },
  { month: "May", desktop: 209, tablet: 83, mobile: 130 },
  { month: "June", desktop: 214, tablet: 42, mobile: 140 },
  { month: "July", desktop: 214, tablet: 103, mobile: 140 },
  { month: "August", desktop: 214, tablet: 20, mobile: 140 },
  { month: "September", desktop: 214, tablet: 33, mobile: 140 },
  { month: "October", desktop: 214, tablet: 92, mobile: 140 },
  { month: "November", desktop: 214, tablet: 77, mobile: 140 },
  { month: "December", desktop: 214, tablet: 41, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  tablet: {
    label: "Tablet",
    color: "#7dd3fc",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
};

const DashboardPage = () => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>You need to be authenticated to view this page.</p>;
  }

  console.log(session);
  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <button
          onClick={() => {
            signOut();
          }}
        >
          Sign out
        </button>
        <div className="col-span-1 order-2 xl:order-1">
          <Card>
            <CardHeader>
              <CardTitle>Leads</CardTitle>
              <CardDescription>Leads Description</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <BarChart data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar
                    dataKey="desktop"
                    fill="var(--color-desktop)"
                    radius={4}
                  />
                  <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                  <Bar dataKey="tablet" fill="var(--color-tablet)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-1 order-1 xl:order-2">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <Alert className="col-span-1 xl:col-span-2">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                You can add components to your app using the cli.
              </AlertDescription>
            </Alert>
            <Card className="p-5 flex justify-start items-center">
              <div className="flex flex-col gap-5 h-full">
                <h4 className="text-black text-sm md:text-base">
                  Total revenue
                </h4>
                <h2 className="text-black font-medium text-base md:text-xl">
                  $2.6M
                </h2>
                <div className="inline-flex gap-1 items-center">
                  <Badge variant="success">+4.5%</Badge>
                  <span className="text-xs">from last week</span>
                </div>
              </div>
            </Card>
            <Card className="p-5 flex justify-start items-center">
              <div className="flex flex-col gap-5 h-full">
                <h4 className="text-black text-sm md:text-base">
                  Average order value
                </h4>
                <h2 className="text-black font-medium text-base md:text-xl">
                  $455
                </h2>
                <div className="inline-flex gap-1 items-center">
                  <Badge variant="danger">-0.5%</Badge>
                  <span className="text-xs">from last week</span>
                </div>
              </div>
            </Card>
            <Card className="p-5 flex justify-start items-center">
              <div className="flex flex-col gap-5 h-full">
                <h4 className="text-black text-sm md:text-base">
                  Tickets sold
                </h4>
                <h2 className="text-black font-medium text-base md:text-xl">
                  5,888
                </h2>
                <div className="inline-flex gap-1 items-center">
                  <Badge variant="success">+4.5%</Badge>
                  <span className="text-xs">from last week</span>
                </div>
              </div>
            </Card>
            <Card className="p-5 flex justify-start items-center">
              <div className="flex flex-col gap-5 h-full">
                <h4 className="text-black text-sm md:text-base">Page views</h4>
                <h2 className="text-black font-medium text-base md:text-xl">
                  823,067
                </h2>
                <div className="inline-flex">
                  <div className="inline-flex gap-1 items-center">
                    <Badge variant="success">+21.2%</Badge>
                    <span className="text-xs">from last week</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div className="my-16 inline-block w-full align-middle">
        <span className="text-sm font-semibold">Recent Orders</span>
        <div className="mt-3 overflow-hidden md:rounded-lg">
          <div className="relative border rounded-xl border-neutral-30 bg-white px-0 py-0 overflow-auto">
            <Table>
              <TableHeader className="bg-zinc-200/30">
                <TableRow>
                  <TableHead className="w-[100px] font-medium p-3">
                    Invoice
                  </TableHead>
                  <TableHead className="font-medium p-3">Status</TableHead>
                  <TableHead className="font-medium p-3">Method</TableHead>
                  <TableHead className="text-right font-medium p-3">
                    Amount
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.invoice}>
                    <TableCell className="font-medium p-3">
                      {invoice.invoice}
                    </TableCell>
                    <TableCell className="p-3">
                      {invoice.paymentStatus}
                    </TableCell>
                    <TableCell className="p-3">
                      {invoice.paymentMethod}
                    </TableCell>
                    <TableCell className="text-right p-3">
                      {invoice.totalAmount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
