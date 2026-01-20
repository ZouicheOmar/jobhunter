import { Badge } from "@/components/ui-elements/Badge";
import { Button } from "@/components/schadcn/Button";
import { getCompanyById } from "@/lib";
import { Company } from "@/types";
import { notFound } from "next/navigation";
import { MonoLayoutWrapper, MonoLayoutTitle } from "@/components/layout/Mono";

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const company: Company | null = await getCompanyById(id);

  if (!company) return notFound();

  return (
    <MonoLayoutWrapper>
      <MonoLayoutTitle title={company.name} />
      <div className="flex justify-between">
        <Badge> {company.id} </Badge>
        <div>
          <Button> edit </Button>
        </div>
      </div>
      <hr className="my-2" />
      <p> website or jobboard </p>
      <p> people </p>
      <hr className="my-2" />
      <p> locations </p>
      <p> company identity / persona </p>
      <p> company size </p>
      <hr className="my-2" />
      <p> last applied </p>
      <p> application details: unsolicited, position, city </p>
      <p> number if multiple applications </p>
      <p> prep / notes </p>
    </MonoLayoutWrapper>
  );
}
