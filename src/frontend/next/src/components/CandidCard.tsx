'use client'
import { useDispatch } from "react-redux"
import { del } from "@/lib/features/candids/candidsSlice";
import { CandidType } from "@/types/CandidType";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "./schadcn/Card";
import { Button } from "./schadcn/Button";
import { useMemo } from "react";


const Section = ({ children }) => <span className="text-muted-foreground">{children} : </span>

export const CandidCard = (
  { candid }: { candid: CandidType }
) => {
  const dispatch = useDispatch();
  const { id,
    title,
    answer,
    addDate,
    stack,
    url,
    websiteDto: website,
    unsolicited,
    cityDto: city,
    company
  } = candid;

  return <>
    <Card className="">
      <CardHeader >
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-card-foreground">
          <p>
            {city.name}
          </p>
          <p>
            {company}
          </p>
        </CardDescription>
        <CardAction>
          <Button
            onClick={() => dispatch(del({ id: id }))}
            variant="outline"
            size="sm"
          >
            del
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="text-sm ">
        {website.name && (<p>
          <Section> applied on </Section>
          {website.name}
        </p>)}

        {<p>
          <Section> unsolicited </Section> {unsolicited ? "yes" : "no"}
        </p>}

        {(stack.length && stack[0]?.name !== "unspecified")
          && (<p>
            <Section>
              tech stack
            </Section>
            {stack.reduce((acc, val) => acc + ", " + val?.name.trim(), stack[0]?.name)}
          </p>)
        }

        {url
          && (
            <p className="truncate">
              <Section >
                url
              </Section>
              {url}
            </p>
          )
        }
      </CardContent>
    </Card>
  </>

}
/* {stack.map((tech) => <span> {tech.name}</span>)} */
