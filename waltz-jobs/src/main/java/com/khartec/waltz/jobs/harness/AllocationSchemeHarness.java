/*
 * Waltz - Enterprise Architecture
 * Copyright (C) 2016, 2017 Waltz open source project
 * See README.md for more information
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

package com.khartec.waltz.jobs.harness;

import com.khartec.waltz.data.allocation.AllocationDao;
import com.khartec.waltz.data.allocation_scheme.AllocationSchemeDao;
import com.khartec.waltz.model.allocation.Allocation;
import com.khartec.waltz.schema.tables.records.AllocationRecord;
import com.khartec.waltz.service.DIConfiguration;
import org.jooq.DSLContext;
import org.jooq.Record3;
import org.jooq.impl.DSL;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.util.Collection;

public class AllocationSchemeHarness {

    public static void main(String[] args) {

        AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext(DIConfiguration.class);
        AllocationSchemeDao dao = ctx.getBean(AllocationSchemeDao.class);


        ctx.getBean(DSLContext.class).transaction(tx -> {

            DSLContext dsl = DSL.using(tx);

            AllocationDao allocationDao = new AllocationDao(dsl);

            Collection<Allocation> allocationsToRemove = allocationDao.findAllocationsToRemove(1);
            System.out.println("done");
            System.out.println(allocationsToRemove);

            Collection<Record3<Long, Long, String>> findMeasurableRatingsToAdd = allocationDao.addMissingAllocations(1);
            System.out.println("done");
            System.out.println(findMeasurableRatingsToAdd.size());

            boolean removed = allocationDao.removeAllocations(allocationsToRemove);
            System.out.println(removed);
            System.out.print(allocationDao.findAllocationsToRemove(1));

            Collection<AllocationRecord> newAllocationRecords = allocationDao.addAllocations(findMeasurableRatingsToAdd, 1);
            System.out.println(newAllocationRecords.size());
            System.out.println(allocationDao.addMissingAllocations(1));


            throw new IllegalArgumentException("Aborting, comment this line if you really mean to execute this removal");
        });

    }
}