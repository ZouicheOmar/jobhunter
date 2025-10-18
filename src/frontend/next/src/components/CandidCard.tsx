import { useDispatch } from "react-redux"
import { Candid } from "@/types/CandidType";
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "./schadcn/Card";
import { Button } from "./schadcn/Button";
import { BackpackIcon, CalendarIcon, Link2Icon, Pencil1Icon, SewingPinFilledIcon, TrashIcon } from "@radix-ui/react-icons";
import { Tractor } from "lucide-react";
import { Badge } from "./Badge";


const Section = ({ children }) => <span className="text-muted-foreground">{children} : </span>

export const CandidCard = (
  { candid }: { candid: Candid }
) => {
  const { id,
    title,
    answer,
    stack,
    url,
    websiteDto: website,
    unsolicited,
    cityDto: city,
    company,
    addDate
  } = candid;

  return <>
    <Card className="">
      <CardHeader >
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-card-foreground">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 w-fit ">
            <div className="w-fit flex items-center gap-2">
              <SewingPinFilledIcon className="inline-block" />
              <span >
                {city.name}
              </span>
            </div>
            <div className="w-fit flex items-center gap-2">
              <BackpackIcon />
              <span >
                {company}
              </span>
            </div>
            <div className="w-fit flex items-center gap-2">
              <CalendarIcon />
              <span >
                {addDate}
              </span>
            </div>

            {url && (
              <div className="w-fit flex items-center gap-1">
                <Link2Icon />
                <a href={url} target="_blank" className="cursor-pointer underline" >
                  url
                </a>
              </div>
            )}
          </div>
        </CardDescription>
        <CardAction className="flex gap-2">
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => console.log("delete")}
          >
            <TrashIcon />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => console.log("add api to update candid")}
          >
            <Pencil1Icon />
          </Button>
        </CardAction>

      </CardHeader>
      <CardContent className="text-sm flex ">
        <div className="flex justify-between w-full ">
          <div className="w-fit">
            {website.name && (<div className="w-fit">
              <Section> applied on </Section>
              {website.name}
            </div>)}

            {<div>
              <Section> unsolicited </Section> {unsolicited ? "yes" : "no"}
            </div>}
          </div>


          <div className="h-fit flex max-w-1/2 gap-2 flex-wrap">
            {stack.map(({ name }, k) => (
              <Badge key={k}> {name}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  </>

}
