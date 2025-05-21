# Project Detail Page Implementation

Allows users to view detailed information about a specific project/site.

## Completed Tasks

- [x] Analyze `Site` model in `prisma/schema.prisma` for relevant fields and relations.
- [x] Address linter errors in `components/app-sidebar.tsx`.
- [x] Create dynamic route `app/dashboard/projects/[siteId]/page.tsx`.
- [x] Implement data fetching in `app/dashboard/projects/[siteId]/page.tsx` to retrieve site details.
- [x] Design and implement the UI for the project detail page.
- [x] Update `SitesDataTable` in `app/dashboard/projects/page.tsx` to link to the new detail page.

## In Progress Tasks

## Future Tasks

- [ ] Add edit functionality for project details.
- [ ] Implement a more visually appealing design for the page.

## Implementation Plan

The project detail page will display comprehensive information about a selected site. This involves:
1.  **Routing**: A dynamic route `app/dashboard/projects/[siteId]/page.tsx` will handle individual project views.
2.  **Data Fetching**: The page will fetch data for a specific site using `prisma.site.findUniqueOrThrow`, including its related `Owner`, `Contact`, `SocialMedia`, `Hero`, and `Service` data.
3.  **UI Design**:
    *   Display the site's `name`, `subdomain`, `description`, `githubRepoUrl`, and `vercelProjectUrl`.
    *   Show `Owner` details: `name`, `email`, `phone`.
    *   Show `Contact` details: `address`, `city`, `phone`, `email`, `workingHours`, `areas`.
    *   List `SocialMedia` links: `facebook`, `instagram`, `linkedin`.
    *   Display `Hero` section content: `mainTitle`, `subtitle`, `highlights`, `ctaPrimary`, `ctaSecondary`.
    *   List `Services`: `title`, `description`, `price`.
    *   The page will use a card-based layout for different sections of information.

### Relevant Files

- `prisma/schema.prisma` - Defines the data structure for a `Site`.
- `app/dashboard/projects/page.tsx` - Will be updated to link to the detail page.
- `app/dashboard/projects/[siteId]/page.tsx` - The new project detail page.
- `components/sites-data-table.tsx` - The component displaying the list of sites, will be modified to include links. 